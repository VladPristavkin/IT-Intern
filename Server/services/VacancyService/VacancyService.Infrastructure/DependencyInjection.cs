using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using VacancyService.Domain.Interfaces;
using VacancyService.Infrastructure.DbContexts;
using VacancyService.Infrastructure.Repositories;

namespace VacancyService.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfractructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DbConnectionString");
            services.AddDbContext<DbContext, ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString, b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));
                options.EnableSensitiveDataLogging();
            });
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}
