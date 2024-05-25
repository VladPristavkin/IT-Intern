using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    internal sealed class VacancyConfiguration : IEntityTypeConfiguration<Vacancy>
    {
        public void Configure(EntityTypeBuilder<Vacancy> builder)
        {
            builder.ToTable(nameof(Vacancy));

            builder.HasKey(vac => vac.Id);
            builder.Property(vac => vac.Id).HasColumnName("VacancyId").IsRequired();
            builder.HasIndex(vac => vac.Id).IsUnique();

            builder.Property(vac => vac.Name).IsRequired();

            builder.Property(vac => vac.Archived).IsRequired().HasDefaultValue(false);

            builder.Property(vac => vac.PublishedAt).IsRequired();
            builder.Property(vac => vac.PublishedAt).HasConversion(v => v.ToUniversalTime(), v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            builder.HasOne(vac => vac.Address)
                .WithOne()
                .HasForeignKey<Vacancy>("AddressId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Area)
                .WithMany()
                .HasForeignKey("AreaId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Employer)
                .WithOne()
                .HasForeignKey<Vacancy>("EmployerId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Employment)
                .WithMany()
                .HasForeignKey("EmploymentId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Experience)
                .WithMany()
                .HasForeignKey("ExperienceId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Schedule)
                .WithMany()
                .HasForeignKey("ScheduleId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(vac => vac.Type)
                .WithMany()
                .HasForeignKey("TypeId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(vac => vac.KeySkills)
                .WithMany(ks => ks.Vacancies)
                .UsingEntity(
                ks => ks.HasOne(typeof(KeySkill)).WithMany().HasForeignKey("KeySkillId"),
                vac => vac.HasOne(typeof(Vacancy)).WithMany().HasForeignKey("VacancyId"));

            builder.HasMany(vac => vac.Languages)
                .WithMany();

            builder.HasMany(vac => vac.ProfessionalRoles)
                .WithMany();

            builder.Property(vac => vac.WebsiteName).IsRequired();

            builder.Property(vac => vac.ParsingTime).IsRequired();

            builder.OwnsOne(vac => vac.Salary, salary =>
            {
                salary.Property(s => s.Currency).HasColumnName("Currency").IsRequired();
                salary.Property(s => s.From).HasColumnName("From");
                salary.Property(s => s.Gross).HasColumnName("Gross").HasDefaultValue(false);
                salary.Property(s => s.To).HasColumnName("To");
            });
        }
    }
}
