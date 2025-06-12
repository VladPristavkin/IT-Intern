using Newtonsoft.Json;
using ParsingService.Application;
using ParsingService.Infrastructure;

namespace ParsingService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                DefaultValueHandling = DefaultValueHandling.Populate,
                Error = (sender, args) =>
                {
                    // Обработка ошибок десериализации
                    if (args.ErrorContext.Error is JsonSerializationException)
                    {
                        args.ErrorContext.Handled = true;
                    }
                },
                Converters = new List<JsonConverter>
    {
        new NullableBooleanConverter()
    }
            };

            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            builder.Services.AddLogging();

            builder.ConfigureEventHandling();

            builder.Services.AddApplication(builder.Configuration);
            builder.Services.AddInfractructure(builder.Configuration);

            var app = builder.Build();

            app.ConfigureVacancyProcessingService(app.Lifetime);

            app.Run();
        }
    }

    public class NullableBooleanConverter : JsonConverter<bool>
    {
        public override bool ReadJson(JsonReader reader, Type objectType, bool existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
                return false; // или другое дефолтное значение по вашему выбору

            return Convert.ToBoolean(reader.Value);
        }

        public override void WriteJson(JsonWriter writer, bool value, JsonSerializer serializer)
        {
            writer.WriteValue(value);
        }
    }
}
