using EventBus.IntegrationEventLog;
using Microsoft.EntityFrameworkCore;
using ParsingService.Domain.Entities.Models;
using ParsingService.Infrastructure.Configurations;

namespace ParsingService.Infrastructure.DbContexts
{
    public sealed class ParsingDbContext : DbContext
    {
        public ParsingDbContext(DbContextOptions<ParsingDbContext> options) : base(options) { }

        public DbSet<Vacancy> Vacancies { get; set; } = null!;
        public DbSet<Address> Addresses { get; set; } = null!;
        public DbSet<Area> Areas { get; set; } = null!;
        public DbSet<Employer> Employers { get; set; } = null!;
        public DbSet<Employment> Employments { get; set; } = null!;
        public DbSet<Experience> Experiences { get; set; } = null!;
        public DbSet<KeySkill> KeySkills { get; set; } = null!;
        public DbSet<Language> Languages { get; set; } = null!;
        public DbSet<Level> Levels { get; set; } = null!;
        public DbSet<MetroLine> MetroLines { get; set; } = null!;
        public DbSet<MetroStation> MetroStations { get; set; } = null!;
        public DbSet<ProfessionalRole> ProfessionalRoles { get; set; } = null!;
        public DbSet<Schedule> Schedules { get; set; } = null!;
        public DbSet<ParsingService.Domain.Entities.Models.Type> Types { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new AreaConfiguration());
            modelBuilder.ApplyConfiguration(new EmployerConfiguration());
            modelBuilder.ApplyConfiguration(new EmploymentConfiguration());
            modelBuilder.ApplyConfiguration(new ExperienceConfiguration());
            modelBuilder.ApplyConfiguration(new KeySkillConfiguration());
            modelBuilder.ApplyConfiguration(new LanguageConfiguration());
            modelBuilder.ApplyConfiguration(new LevelConfiguration());
            modelBuilder.ApplyConfiguration(new MetroLineConfiguration());
            modelBuilder.ApplyConfiguration(new MetroStationConfiguration());
            modelBuilder.ApplyConfiguration(new ProfessionalRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ScheduleConfiguration());
            modelBuilder.ApplyConfiguration(new TypeConfiguration());
            modelBuilder.ApplyConfiguration(new VacancyConfiguration());
            modelBuilder.AddEventLogTable();
        }
    }
}
