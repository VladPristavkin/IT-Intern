using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ParsingService.Application.Common.Helpers
{
    public static class JsonHelper
    {
        public static T? ReadFromJsonFile<T>(string filePath)
        {
            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy(),
                },
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            using (StreamReader reader = new StreamReader(filePath))
            {
                string json = reader.ReadToEnd();

                return JsonConvert.DeserializeObject<T>(json, jsonSerializerSettings);
            }
        }

        public static void WriteToJsonFile<T>(string filePath, T data)
        {
            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy(),
                },
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };

            string json = JsonConvert.SerializeObject(data, jsonSerializerSettings);
            File.WriteAllText(filePath, json);
        }
    }
}
