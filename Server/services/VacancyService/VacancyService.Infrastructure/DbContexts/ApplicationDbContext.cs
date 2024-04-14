using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Infrastructure.Configurations;

namespace VacancyService.Infrastructure.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

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

            base.OnModelCreating(modelBuilder);
        }

        #region DbSets
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
        public DbSet<VacancyService.Domain.Entities.Models.Type> Types { get; set; } = null!;
        public DbSet<Vacancy> Vacancies { get; set; } = null!;
        #endregion
    }
}
