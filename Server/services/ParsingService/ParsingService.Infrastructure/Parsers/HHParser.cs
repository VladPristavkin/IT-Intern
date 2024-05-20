using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ParsingService.Domain.Entities.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Application.Common.Helpers;
using Microsoft.Extensions.Configuration;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.Events;

namespace ParsingService.Infrastructure.Parsers
{
    public class HHParser : IParser
    {
        private readonly IIntegrationEventService _integrationEventService;
        private string BaseUri { get; set; }
        private IDictionary<string, IList<string>> _parameters;
        private readonly IVacancyRepository _vacancyRepository;

        public HHParser(IIntegrationEventService integrationEventService,IVacancyRepository vacancyRepository,IConfiguration configuration)
        {
            _integrationEventService= integrationEventService;
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
            //ToDo: нужно доделать
            List<Vacancy> vacancies = new List<Vacancy>();

            List<int> ids = /*GetIdsDynamic();*/ new() { 99058928,
99131788,
99073194,
97652479,
99058197,
98756662,
95636729,
93925559,
97699469,
91944640,
90347563,
98005186,
97829344,
98052590,
93864421,
97585016,
98935895,
98256801,
98525973,
97830059,
97848420,
98707798,
99247657,
99137289,
98902301,
98774347,
98266767,
97817118,
98799618,
98266376,
98956391,
98205372,
97782246,
97719374,
98415612,
98611604,
98880643,
98609371,
98625910,
99251826,
98823559,
97451901,
98481153,
99464673,
98939933,
99121825,
99084654,
98830938,
99074918,
98933101,
98709559,
98356556,
99312902,
97597979,
99478584,
98262301,
98543465,
99254973,
98305477,
98488019,
98489651,
99051422,
98790265,
99056986,
99519908,
99471739,
98115724,
98239731,
98118489,
98788612,
99147311,
98050941,
97844717,
98259735,
92479553,
98355774,
93795719,
93033345,
98266058,
97929605,
97842275,
88031148,
98673661,
99011897,
99248569,
99405809,
99173973,
98756663,
98535330,
97343217,
98558818,
98729502,
98922243,
96230827,
94031234,
97870412,
99230409,
98768719,
98348077,
98559842,
97428161,
98494093,
98831000,
89860554,
99542396,
99261565,
98544107,
99044257,
99168323,
94103542,
97222975,
97647327,
97974241,
99327298,
99233500,
99545381,
93876786,
97138790,
97083385,
97639157,
98776988,
92399743,
99293521,
95523580,
99161955,
98326398,
94769505,
99141067,
99542192,
40365272,
98443551,
86326585,
97140728,
91995559,
97833973,
98485247,
97036731,
98954748,
94680951,
98635477,
98698908,
93655999,
97884095,
98487492,
98452701,
98745152,
99542084,
96974789,
96486336,
97134399,
98214068,
99567977,
94694585,
98074754,
99179233,
93194906,
98685300,
97090514,
98327171,
94686528,
93927664,
95194235,
99129540,
99008383,
87899976,
98504475,
98435432,
97910840,
95622466,
98489394,
93337826,
95294256,
99530700,
98811734,
97829094,
96793629,
98187062,
91820624,
99550089,
89795227,
98685992,
96492375,
98490977,
92569414,
97246667,
98526685,
95874063,
98562449,
99552862,
99015268,
90414471,
96425296,
98013462,
99557527,
98489511,
98487479,
95072462,
95294257,
89345259,
94611743,
98354946,
99218480,
98177094,
97542650,
98831002,
92875513,
94274321,
94934923,
97822660,
94660814,
99026073,
99298957,
98068910,
99298956,
93891925,
82895768,
98197299,
99061545,
93560611,
90715495,
95880494,
98487457,
97654615,
97721566,
97914823,
95294266,
99297497,
97848736,
97131554,
97709676,
98068909,
93292317,
94254877,
97826212,
98310100,
98545638,
97887994,
98068908,
98303561,
87669898,
98431952,
99023792,
95290515,
95290519,
96608089,
87899948,
97141154,
98350360,
93996804,
93867609,
88613795,
98133804,
97825528,
93788503,
94030260,
97880994,
98073196,
94673587,
93596510,
97597671,
97938485,
97040765,
99149906,
96971517,
97874056,
98545604,
99067110,
82815927,
87900036,
95451064,
99298958,
89194276,
82979426,
89526262,
99051081,
98326836,
99014601,
95415287,
93198036,
97695716,
97736639,
98489571,
98555827,
97615077,
89244842,
98490980,
98208788,
78607157,
87045551,
98525970,
95413264,
98068916,
93159784,
98545612,
96440203,
96603596,
95413266,
97890114,
95294262,
98433072,
95290516,
96978813,
95415286,
98307084,
96201727,
98311572,
97351282,
97630632,
98225145,
98068911,
97652094,
93560607,
98520838,
98525963,
95294263,
95857661,
98672353,
98490979,
95415284,
97187568,
95290518,
95413265,
97797777,
98525964,
96994164,
95779240,
95415285,
95179793,
98164626,
95780818,
94270506,
95413267,
97885200,
96798921,
98476604,
96978595,
99119228,
99037138,
98905982,
97571358,
87899709,
96404487,
89051960,
96434792,
94590124,
94031172,
98811032,
93843584,
93842800,
97701057,
79925492,
97944633,
92890183,
96812470,
86133773};

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

                        var baseVacancy = JsonConvert.DeserializeObject<Vacancy>(result, jsonSerializerSettings);

                        baseVacancy.WebsiteName = "HH";
                        baseVacancy.WebsiteLogoUrl = "https://i.hh.ru/webpackBuild/fee0d431ce023a3b9b0e.svg";//ToDo: Find true uri
                        baseVacancy.WebsiteUrl = "https://hh.ru/";
                        baseVacancy.OriginalVacancyUrl = BaseUri + $"/{id}";
                        baseVacancy.ParsingTime = DateTime.UtcNow;
                        baseVacancy.Salary.From = 0;

                        vacancies.Add(baseVacancy);

                        //_vacancyRepository.CreateVacancyAsync(baseVacancy);

                        if (vacancies.Count > 10)
                        {
                            _integrationEventService.SaveEventAsync(new VacancyCreatedIntegrationEvent(vacancies));
                            vacancies= new List<Vacancy>();
                            _integrationEventService.PublishEventsThroughEventBusAsync();
                        }

                        Thread.Sleep(500);
                    }

                    return Task.CompletedTask ;
                }
                catch (Exception e)
                {
                    throw new Exception("HHParser.Parse\n" + e.Message);
                }

                return Task.CompletedTask;
            }
        }

        private List<int> GetIdsDynamic()
        {
            List<int> ids = new List<int>();

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
                foreach (var id in ids)
                {
                    Console.WriteLine(id);
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
