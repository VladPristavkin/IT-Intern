using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using VacancyService.Infrastructure.DbContexts;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace VacancyService.Infrastructure.ContextFactory
{
    public class RepositoryContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var buiilder = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer(configuration.GetConnectionString("DbConnectionString"),
                b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));

            return new ApplicationDbContext(buiilder.Options);
        }
    }
}
