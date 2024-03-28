using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    internal sealed class LevelConfiguration : IEntityTypeConfiguration<Level>
    {
        public void Configure(EntityTypeBuilder<Level> builder)
        {
            builder.ToTable(nameof(Level));

            builder.HasIndex(level => level.Id);

            builder.Property(level => level.Id).HasColumnName("LevelId").IsRequired();

            builder.HasIndex(level => level.Id).IsUnique();

            builder.Property(level => level.Name).IsRequired();
        }
    }
}
