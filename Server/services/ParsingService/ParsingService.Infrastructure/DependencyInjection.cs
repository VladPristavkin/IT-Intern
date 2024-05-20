using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ParsingService.Application.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Infrastructure.DbContexts;
using ParsingService.Infrastructure.Parsers;
using ParsingService.Infrastructure.Repositiories;
using System.Reflection;

namespace ParsingService.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfractructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");

            services.AddSingleton<DbContext, ParsingDbContext>(provider =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<ParsingDbContext>();
                optionsBuilder.UseNpgsql(connectionString, b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));
                return new ParsingDbContext(optionsBuilder.Options);
            });

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
