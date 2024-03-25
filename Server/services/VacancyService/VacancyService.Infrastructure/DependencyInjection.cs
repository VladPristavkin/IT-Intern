using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }
    }
}
