using ParsingService.Application;
using ParsingService.Infrastructure;

namespace ParsingService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

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
}
