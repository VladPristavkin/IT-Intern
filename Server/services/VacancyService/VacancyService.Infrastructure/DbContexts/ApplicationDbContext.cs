using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Infastrucrure.Configurations;

namespace VacancyService.Infastrucrure.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vacancy>()
                .HasMany(v => v.ProfessionalRoles)
                .WithMany(p=>p.Vacancies)
                .UsingEntity(j => j.ToTable("VacancyProfessionalRole"));

            modelBuilder.Entity<Address>()
                .HasMany(a=>a.MetroStations)
                .WithMany(m=>m.Addresses)
                .UsingEntity(j => j.ToTable("AddressMetroStation"));

            modelBuilder.Entity<Vacancy>()
                 .HasMany(v => v.KeySkills)
                 .WithMany(k=>k.Vacancies)
                 .UsingEntity(j => j.ToTable("VacancyKeySkill"));

            modelBuilder.Entity<Vacancy>()
                .HasMany(v => v.Languages)
                .WithMany(l=>l.Vacancies)
                .UsingEntity(j => j.ToTable("VacancyLanguage"));

            modelBuilder.Entity<Language>()
                .HasMany(l => l.Levels)
                .WithMany(l => l.Languages)
                .UsingEntity(j => j.ToTable("LanguageLevel"));

            modelBuilder.ApplyConfiguration(new AreaConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        #region DbSets
        public DbSet<Area> Areas { get; set; } = null!;
        public DbSet<Employer> Employers { get; set; } = null!;
        public DbSet<Employment> Employments { get; set; } = null!;
        public DbSet<Experience> Experiences { get; set; } = null!;
        public DbSet<Language> Languages { get; set; } = null!;
        public DbSet<MetroLine> MetroLines { get; set; } = null!;
        public DbSet<MetroStation> MetroStations { get; set; } = null!;
        public DbSet<ProfessionalRole> ProfessionalRoles { get; set; } = null!;
        public DbSet<Schedule> Schedules { get; set; } = null!;
        public DbSet<VacancyService.Domain.Entities.Models.Type> Types { get; set; } = null!;
        public DbSet<Vacancy> Vacancies { get; set; } = null!;
        #endregion
    }
}
