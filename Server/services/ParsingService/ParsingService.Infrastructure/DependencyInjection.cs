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
using ParsingService.Infrastructure.HostedService;
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

            services.AddSingleton(sp =>
            {
                var connectionString = configuration.GetConnectionString("DbConnectionString");
                var logger = sp.GetRequiredService<ILogger<DatabaseInitializer>>();
                var integrationEventService = sp.GetRequiredService<IIntegrationEventService>();
                var metroRepository = sp.GetRequiredService<IMetroRepository>();

                return new DatabaseInitializer(connectionString, logger: logger,
                    integrationEventService, metroRepository);
            });

            services.AddHostedService<DatabaseInitializationHostedService>();

            return services;
        }
    }
}
