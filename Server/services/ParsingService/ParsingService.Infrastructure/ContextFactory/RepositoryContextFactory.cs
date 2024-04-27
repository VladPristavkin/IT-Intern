using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.Reflection;
using ParsingService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.ContextFactory
{
    public class RepositoryContextFactory : IDesignTimeDbContextFactory<ParsingDbContext>
    {
        ParsingDbContext IDesignTimeDbContextFactory<ParsingDbContext>.CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json")
              .Build();

            var builder = new DbContextOptionsBuilder<ParsingDbContext>()
               .UseNpgsql(configuration.GetConnectionString("DbConnectionString"),
               b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));

            return new ParsingDbContext(builder.Options);
        }
    }
}
