using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class MetroStationConfiguration : IEntityTypeConfiguration<MetroStation>
    {
        public void Configure(EntityTypeBuilder<MetroStation> builder)
        {
            builder.ToTable(nameof(MetroStation));

            builder.HasKey(ms=>ms.Id);

            builder.Property(ms=>ms.Id).HasColumnName("MetroStationId").IsRequired();

            builder.HasIndex(ms=>ms.Id).IsUnique();
        }
    }
}
