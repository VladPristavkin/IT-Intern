using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
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
