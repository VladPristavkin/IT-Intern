using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ParsingService.Domain.Entities.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Application.Common.Helpers;
using Microsoft.Extensions.Configuration;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.Events;
using EventBus.Interfaces;
using EventBus.IntegrationEventLog.Services;
using EventBus.Events;
using System.Reflection;

namespace ParsingService.Infrastructure.Parsers
{
    public class HHParser : IParser
    {
        private List<int> ids = new List<int>();
        private readonly IIntegrationEventService _integrationEventService;
        private string BaseUri;
        private readonly DbContext _dbContext;
        private IDictionary<string, IList<string>> _parameters;
        private readonly IVacancyRepository _vacancyRepository;

        public HHParser(IIntegrationEventService integrationEventService, IVacancyRepository vacancyRepository, IConfiguration configuration)
        {
            _integrationEventService = integrationEventService;
            _vacancyRepository = vacancyRepository;
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
            try
            {
                GetIdsDynamic();

            List<int> ids = /*GetIdsDynamic()*/new List<int>() {95683721,
93029089,
90561511,
94663168,
90728680,
91255465,
92205633,
93213372,
98068912,
90479977,
93541496,
95294264,
97988620,
95290524,
98525962,
86724674,
97866220,
95415291,
92317265,
95413272 };

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                foreach (var subParameter in _parameters["professional_role"])
                {
                    string uri = BaseUri + "?experience=noExperience&experience=between1And3&professional_role=" + subParameter;
                    FetchVacanciesUntilLimit(ref ids, client, uri, 1);
                }
            }

            return ids;
        }

        private bool FetchVacanciesUntilLimit(ref List<int> ids, HttpClient client, string uri, int numberOfParameter)
        {
            if (ids.Count > 300)
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy(),
                    }
                };

                foreach (var id in ids)
                {
                    var request = client.GetStringAsync(BaseUri + $"/{id}").Result;

                    var baseVacancy = JsonConvert.DeserializeObject<Vacancy>(request, jsonSerializerSettings);

                        baseVacancy.WebsiteName = "HH";
                        baseVacancy.WebsiteLogoUrl = "https://i.hh.ru/webpackBuild/fee0d431ce023a3b9b0e.svg";//ToDo: Find true uri
                        baseVacancy.WebsiteUrl = "https://hh.ru/";
                        baseVacancy.OriginalVacancyUrl = BaseUri + $"/{id}";
                        baseVacancy.ParsingTime = DateTime.UtcNow;
                        baseVacancy.Salary = new Salary() { Currency = "", From = 1000 };

                        vacancies.Add(baseVacancy);

                        //_vacancyRepository.CreateVacancyAsync(baseVacancy);

                        if (vacancies.Count > 10)
                        {
                             _integrationEventService.SaveEventAsync(new VacancyCreatedIntegrationEvent(vacancies));

                            _vacancyRepository.DeleteVacancies(vacancies.ToArray());

                             _integrationEventService.PublishEventsThroughEventBusAsync();

                            vacancies = new List<Vacancy>();
                        }

                        Thread.Sleep(500);
                    }

                    return Task.CompletedTask;
                }
                catch (Exception e)
                {
                    throw new Exception("HHParser.Parse\n" + e.Message);
                }

                        var employer = client.GetStringAsync("https://api.hh.ru/employers" + $"/{baseVacancy.Employer.Id}").Result;

                        var employerEntity = JsonConvert.DeserializeObject<Employer>(employer, jsonSerializerSettings);

                        string pattern = @"""90"":\s*""([^""]+)""";

                        baseVacancy.Employer.LogoUrl = Regex.Match(request, pattern).Groups[1].Value;
                        baseVacancy.Employer.IdFromBasicWebsite = baseVacancy.Employer.Id.ToString();
                        baseVacancy.Employer.Id = 0;
                        baseVacancy.Employer.Description = employerEntity.Description;
                    }

                    new CreateVacancyHandler(_vacancyRepository, _dbContext).Handle(baseVacancy, default).Wait();

                    Thread.Sleep(500);
                }
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
