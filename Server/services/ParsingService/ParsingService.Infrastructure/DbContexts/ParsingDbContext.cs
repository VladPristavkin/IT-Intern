using EventBus.IntegrationEventLog;
using Microsoft.EntityFrameworkCore;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.DbContexts
{
    public sealed class ParsingDbContext : DbContext
    {
        public ParsingDbContext(DbContextOptions<ParsingDbContext> options) : base(options) { }

        public DbSet<Vacancy> Vacancies { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.AddEventLogTable();
        }
    }
}
