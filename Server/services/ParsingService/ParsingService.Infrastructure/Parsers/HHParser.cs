using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ParsingService.Application.Common.Helpers;
using ParsingService.Domain.Abstractions;
using ParsingService.Domain.Entities.Models;
using System.Text.RegularExpressions;

namespace ParsingService.Infrastructure.Parsers
{
    public class HHParser : IParser
    {
        private List<int> ids = new List<int>();
        private List<int> idsInDatabase = new List<int>();
        private string BaseUri;
        private IDictionary<string, IList<string>> _parameters;
        private readonly JsonSerializerSettings _jsonSerializerSettings;
        private readonly IVacancyRepository _vacancyRepository;
        private readonly IMetroRepository _metroRepository;

        public HHParser(IVacancyRepository vacancyRepository,
            IMetroRepository metroRepository,
            IConfiguration configuration)
        {
            _vacancyRepository = vacancyRepository;
            _metroRepository = metroRepository;
            _parameters = new Dictionary<string, IList<string>>();

            BaseUri = configuration.GetSection(IParser.OptionsForParsing)
                .GetSection(GetType().Name)
                .GetSection(IParser.BaseUri).Value
                 ?? throw new ArgumentNullException($"Section with name {GetType().Name} have not a value.");

            string path = configuration.GetSection(IParser.OptionsForParsing)
                .GetSection(GetType().Name)
                .GetSection(IParser.PathForOptionsFile).Value
                ?? throw new ArgumentNullException($"Section with name {GetType().Name} have not a value.");

            var prioritiesPairs = configuration.GetSection(IParser.OptionsForParsing)
                .GetSection(GetType().Name)
                .GetSection(IParser.Priorities).GetChildren().ToList();

            var priorities = new List<string>();

            foreach (var priority in prioritiesPairs)
            {
                if (priority.Value != null)
                    priorities.Add(priority.Value);
            }

            if (!File.Exists(path)) throw new FileNotFoundException($"File with {path} not found.");

            var HHConfiguration = new ConfigurationBuilder()
                .AddJsonFile(path, optional: true, reloadOnChange: true)
                .Build();

            foreach (var section in HHConfiguration.GetChildren())
            {
                var list = new List<string>();
                foreach (var optionValue in section.GetChildren())
                {
                    list.Add(optionValue.Value ?? string.Empty);
                }
                _parameters.Add(section.Key, list);
            }

            ParameterHelper.MovingByPriorityArray(ref _parameters, priorityArray: priorities.ToArray());


            _jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy(),
                }
            };
        }

        public Task Parse()
        {
            ids = new List<int>();

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                    foreach (var subParameter in _parameters["professional_role"])
                    {
                        string uri = BaseUri + "?experience=noExperience&experience=between1And3&professional_role=" + subParameter;
                        FetchVacanciesUntilLimit(ref ids, client, uri, 1);
                    }
                }

                return Task.CompletedTask;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception(e.Source);
            }
        }

        private bool FetchVacanciesUntilLimit(ref List<int> ids, HttpClient client, string uri, int numberOfParameter)
        {
            if (ids.Count > 110)
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                foreach (var id in ids)
                {
                    var request = client.GetStringAsync(BaseUri + $"/{id}").Result;

                    var baseVacancy = JsonConvert.DeserializeObject<Vacancy>(request, _jsonSerializerSettings);

                    CreateVacancyAsync(baseVacancy, id, request);

                    Thread.Sleep(500);
                }

                idsInDatabase.AddRange(ids);
                ids = new List<int>();
            }

            string result = "";

            result = client.GetStringAsync(uri).Result;

            Thread.Sleep(500);

            var baseVacanies = JsonConvert.DeserializeObject<VacancyCollection>(result);

            if (baseVacanies.found > 2000)
            {
                foreach (var parameter in _parameters.Values.ToList()[numberOfParameter])
                {
                    var tempUri = uri + $"&{_parameters.Keys.ToList()[numberOfParameter]}={parameter}";

                    FetchVacanciesUntilLimit(ref ids, client, tempUri, numberOfParameter + 1);
                }

                return true;
            }

            if (baseVacanies.found == 0) return true;

            double per_page = 20.0;

            if (baseVacanies.found > 100)
            {
                per_page = 100.0;
            }

            int pages = (int)Math.Ceiling((double)(baseVacanies.found / per_page));

            for (int j = 0; j < pages; j++)
            {
                var tempUri = uri + $"&per_page={(int)per_page}" + $"&page={j}";

                result = client.GetStringAsync(tempUri).Result;

                var vacancyCollection = JsonConvert.DeserializeObject<VacancyCollection>(result);

                foreach (var item in vacancyCollection.items)
                {
                    if (!ids.Contains(item.id) && !idsInDatabase.Contains(item.id))
                    {
                        ids.Add(item.id);
                    }
                }

                Thread.Sleep(500);
            }

            return true;
        }

        private sealed class VacancyCollection
        {
            public Item[] items { get; set; }
            public int found { get; set; }
            public int pages { get; set; }
            public int per_page { get; set; }
            public int page { get; set; }
            public string alternate_url { get; set; }

            public sealed class Item
            {
                public int id { get; set; }
            }
        }

        private async void CreateVacancyAsync(Vacancy baseVacancy, int vacancyId, string requestData)
        {
            baseVacancy.WebsiteName = "HH";
            baseVacancy.WebsiteLogoUrl = "https://i.hh.ru/webpackBuild/fee0d431ce023a3b9b0e.svg";//ToDo: Find true uri
            baseVacancy.WebsiteUrl = "https://hh.ru/";
            baseVacancy.OriginalVacancyUrl = BaseUri + $"/{vacancyId}";
            baseVacancy.ParsingTime = DateTime.UtcNow;
            baseVacancy.IdFromWebsite = baseVacancy.Id.ToString();
            baseVacancy.Id = 0;

            if (baseVacancy.Employer != null)
            {
                Thread.Sleep(500);

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                    var employer = client.GetStringAsync("https://api.hh.ru/employers" + $"/{baseVacancy.Employer.Id}").Result;

                    var employerEntity = JsonConvert.DeserializeObject<Employer>(employer, _jsonSerializerSettings);

                    string pattern = @"""90"":\s*""([^""]+)""";

                    baseVacancy.Employer.LogoUrl = Regex.Match(requestData, pattern).Groups[1].Value;
                    baseVacancy.Employer.IdFromBasicWebsite = baseVacancy.Employer.Id.ToString();
                    baseVacancy.Employer.Id = 0;
                    baseVacancy.Employer.Description = employerEntity.Description;
                }
            }

            await HandleAddressAsync(baseVacancy);

            await _vacancyRepository.CreateVacancyAsync(baseVacancy);
        }

        private async Task<Vacancy> HandleAddressAsync(Vacancy vacancy)
        {
            if (vacancy.Address != null)
            {
                vacancy.Address.MetroStations = new List<MetroStation>();

                var metroStations = new List<MetroStation>();

                foreach (var metroLine in await _metroRepository.GetAllMetroLinesAsync())
                {
                    if (metroLine.Stations != null)
                        metroStations.AddRange(metroLine.Stations);
                }

                foreach (var metroStation in metroStations)
                {
                    if (vacancy.Address.Lat == null || vacancy.Address.Lng == null ||
                        metroStation.Lat == null || metroStation.Lng == null)
                    {
                        return vacancy;
                    }

                    var distance = GeoHelper
                        .CalculateDistance(vacancy.Address.Lat.Value, vacancy.Address.Lng.Value,
                        metroStation.Lat.Value, metroStation.Lng.Value);

                    if (distance <= GeoHelper.DefaultStationRadius)
                    {
                        ((List<MetroStation>)vacancy.Address.MetroStations).Add(metroStation);
                    }
                }
            }

            return vacancy;
        }
    }
}
