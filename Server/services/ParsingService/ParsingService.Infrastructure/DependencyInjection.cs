using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ParsingService.Application.Models;
using ParsingService.Domain.Abstractions;
using ParsingService.Infrastructure.DbContexts;
using ParsingService.Infrastructure.Parsers;
using System.Reflection;

namespace ParsingService.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfractructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");
            services.AddDbContext<ParsingDbContext>(options =>
            {
                options.UseNpgsql(connectionString, b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));
                options.EnableSensitiveDataLogging();
            });

            services.Configure<ParsingOptions>(po =>
            {
                services.AddKeyedSingleton<IParser, HHParser>(typeof(HHParser));
                po.ParserTypes[typeof(HHParser).Name] = typeof(HHParser);
            });
        }
    }
}
