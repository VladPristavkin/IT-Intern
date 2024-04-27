﻿using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using JobSearchAssistant.BL.Parser.ParsingModel;

namespace JobSearchAssistant.BL.Parser
{
    public class HHParser : IParser
    {
        public string baseUrl { get; set; }

        IEnumerable<string> IParser.Urls { get; set; }


        private IDictionary<string, IList<string>> _parameters;

        public IDictionary<string, IList<string>> Parameters_1
        {
            get { return _parameters; }
            set { _parameters = value; }
        }

        IDictionary<string, IDictionary<string, IList<string>>> IParser.Parameters_2 { get; set; }

        IDictionary<string, IDictionary<string, IDictionary<string, IList<string>>>> IParser.Parameters_3 { get; set; }


        public IEnumerable<FullVacancy> Parse()
        {
            //ToDo: нужно доделать
            List<FullVacancy> vacancies = new List<FullVacancy>();

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
                        var result = client.GetStringAsync(baseUrl + $"/{id}").Result;
                        var baseVacancy = JsonConvert.DeserializeObject<FullVacancy>(result);
                        baseVacancy.WebsiteName="HH";
                        vacancies.Add(baseVacancy);
                        Thread.Sleep(500);
                    }
                }
                catch (Exception e)
                {
                    throw new Exception("HHParser.Parse\n" + e.Message);
                }
            }

            return vacancies;
        }

        private List<int> GetIdsDynamic()
        {
            ParameterHelper.MovingByPriorityArray(ref _parameters, new string[] { "professional_role","area", "industry",
            "employment","schedule","education","accept_temporary","only_with_salary","salary","experience"});

            List<int> ids = new List<int>();

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("User-Agent", "application/json");

                foreach (var subParameter in Parameters_1["professional_role"])
                {
                    string uri = baseUrl + "experience=noExperience&experience=between1And3&professional_role=" + subParameter;
                    FetchVacanciesUntilLimit(ref ids, client, uri, 1);
                }
            }

            return ids;
        }

        private bool FetchVacanciesUntilLimit(ref List<int> ids, HttpClient client, string uri, int numberOfParameter)
        {
            string result = "";

            result = client.GetStringAsync(uri).Result;
            Console.WriteLine(uri);
            Thread.Sleep(500);

            var baseVacanies = JsonConvert.DeserializeObject<VacancyCollection>(result);

            if (baseVacanies.found > 2000)
            {
                foreach (var parameter in Parameters_1.Values.ToList()[numberOfParameter])
                {
                    var tempUri = uri + $"&{Parameters_1.Keys.ToList()[numberOfParameter]}={parameter}";

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

        public HHParser(string baseUrl)
        {
            this.baseUrl = baseUrl ?? throw new Exception("HHParser.ctor(string)");
        }

        public HHParser() : this(" ") { }
    }
}