using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    internal sealed class KeySkillConfiguration : IEntityTypeConfiguration<KeySkill>
    {
        public void Configure(EntityTypeBuilder<KeySkill> builder)
        {
            builder.ToTable(nameof(KeySkill));

            builder.HasKey(ks => ks.Name);

            builder.Property(ks => ks.Name).HasColumnName("KeySkillId").IsRequired();

            builder.HasIndex(ks => ks.Name).IsUnique();
        }
    }
}
