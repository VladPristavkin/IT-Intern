using Identity.Infra.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace Identity.Infra.DbContextFactory
{
    internal sealed class AuthContextFactory : IDesignTimeDbContextFactory<AuthDbContext>
    {
        public AuthDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();

            var buiilder = new DbContextOptionsBuilder<AuthDbContext>()
              .UseNpgsql(configuration.GetConnectionString("DbConnectionString"),
              b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));

            return new AuthDbContext(buiilder.Options);
        }
    }
}
