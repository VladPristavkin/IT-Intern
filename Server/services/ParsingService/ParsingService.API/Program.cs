using ParsingService.Application;
using ParsingService.Infrastructure;
namespace ParsingService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddApplication();
            builder.Services.AddInfractructure(builder.Configuration);

            builder.ConfigureEventHandling();

            var app = builder.Build();

            app.ConfigureVacancyProcessingService(app.Lifetime);

            app.Run();
        }
    }
}
