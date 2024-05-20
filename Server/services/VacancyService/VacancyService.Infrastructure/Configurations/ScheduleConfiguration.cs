using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(EntityTypeBuilder<Schedule> builder)
        {
            builder.ToTable(nameof(Schedule));

            builder.HasKey(sch => sch.Id);

            builder.Property(sch => sch.Id).HasColumnName("ScheduleId").IsRequired();

            builder.HasIndex(sch => sch.Id).IsUnique();

            builder.Property(sch => sch.Name).IsRequired();
        }
    }
}
