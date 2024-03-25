using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    internal sealed class AreaConfiguration : IEntityTypeConfiguration<Area>
    {
        public void Configure(EntityTypeBuilder<Area> builder)
        {
            builder.ToTable(nameof(Area));
            builder.HasKey(area => area.Id);
            builder.Property(area => area.Id).HasColumnName("AreaId");
            builder.HasIndex(area => area.Id).IsUnique();
            builder.Property(area=>area.Name).IsRequired().HasMaxLength(255);
        }
    }
}
