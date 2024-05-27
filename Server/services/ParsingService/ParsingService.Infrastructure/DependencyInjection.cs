using EventBus.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Infrastructure.Parsers;
using ParsingService.Infrastructure.Repositiories;
using System.Data.Common;

namespace ParsingService.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfractructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");

            DbProviderFactories.RegisterFactory("Npgsql", NpgsqlFactory.Instance);

            services.AddKeyedSingleton<IParser, HHParser>(typeof(HHParser));
            services.Configure<ParsingOptions>(po =>
            {
                po.ParserTypes[typeof(HHParser).Name] = typeof(HHParser);
            });

            services.AddSingleton<IVacancyRepository, VacancyRepository>(options =>
            {
                return new VacancyRepository(connectionString);
            });

            services.AddSingleton<IMetroRepository, MetroRepository>(options =>
            {
                return new MetroRepository(connectionString);
            });

            return services;
        }


        public static IApplicationBuilder DatabaseInitialize(this IApplicationBuilder app, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");
            var logger = app.ApplicationServices.GetService<ILogger<DatabaseInitializer>>();
            var integrationEventService = app.ApplicationServices.GetRequiredService<IIntegrationEventService>();

            var dbInitializer = new DatabaseInitializer(connectionString, logger: logger, integrationEventService);
            dbInitializer.InitializeAsync().GetAwaiter().GetResult();

            return app;
        }
    }
}
