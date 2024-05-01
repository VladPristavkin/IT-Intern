using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ParsingService.Domain.Entities.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Application.Common.Helpers;
using Microsoft.Extensions.Configuration;

namespace ParsingService.Infrastructure.Parsers
{
    public class HHParser : IParser
    {
        private string BaseUri { get; set; }

        private IDictionary<string, IList<string>> _parameters;

        public HHParser(IConfiguration configuration)
        {
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
        }

        public Task Parse()
        {
            //ToDo: нужно доделать
            List<Vacancy> vacancies = new List<Vacancy>();

            List<int> ids = GetIdsDynamic();

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy(),
                    }
                };

                try
                {
                    foreach (var id in ids)
                    {
                        var result = client.GetStringAsync(BaseUri + $"/{id}").Result;

                        var baseVacancy = JsonConvert.DeserializeObject<Vacancy>(result);

                        baseVacancy.WebsiteName = "HH";
                        baseVacancy.WebsiteLogoUrl = "https://i.hh.ru/webpackBuild/fee0d431ce023a3b9b0e.svg";//ToDo: Find true uri
                        baseVacancy.WebsiteUrl = "https://hh.ru/";
                        baseVacancy.OriginalVacancyUrl = BaseUri + $"/{id}";
                        baseVacancy.ParsingTime = DateTime.UtcNow;

                        vacancies.Add(baseVacancy);

                        Thread.Sleep(500);
                    }
                }
                catch (Exception e)
                {
                    throw new Exception("HHParser.Parse\n" + e.Message);
                }
            }

            return Task.CompletedTask;
        }

        private List<int> GetIdsDynamic()
        {
            List<int> ids = new List<int>();

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                foreach (var subParameter in _parameters["professional_role"])
                {
                    string uri = BaseUri + "experience=noExperience&experience=between1And3&professional_role=" + subParameter;
                    FetchVacanciesUntilLimit(ref ids, client, uri, 1);
                }
            }

            return ids;
        }

        private bool FetchVacanciesUntilLimit(ref List<int> ids, HttpClient client, string uri, int numberOfParameter)
        {
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
                    if (!ids.Contains(item.id))
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
    }
}
