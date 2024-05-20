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

            builder.Property(area => area.Id).HasColumnName("AreaId").IsRequired();

            builder.HasIndex(area => area.Id).IsUnique();

            builder.Property(area=>area.Name).IsRequired();

            builder.HasOne(area => area.Parent)
                .WithMany(area => area.Areas)
                .HasForeignKey("ParentId")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(area => area.Lines)
                .WithOne(line=>line.Area)
                .HasForeignKey("AreaId")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
