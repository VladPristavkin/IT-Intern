using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ParsingService.Application.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Infrastructure.Parsers;
using ParsingService.Infrastructure.Repositiories;

namespace ParsingService.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfractructure(this IServiceCollection services,
            IConfiguration configuration,
            IServiceProvider serviceProvider)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");
            var logger = serviceProvider.GetRequiredService<ILogger>();

            var dbInitializer = new DatabaseInitializer(connectionString, logger: logger);
            dbInitializer.InitializeAsync().GetAwaiter().GetResult();

            services.AddKeyedSingleton<IParser, HHParser>(typeof(HHParser));
            services.Configure<ParsingOptions>(po =>
            {
                po.ParserTypes[typeof(HHParser).Name] = typeof(HHParser);
            });

            services.AddSingleton<IVacancyRepository, VacancyRepository>();

            return services;
        }
    }
}
