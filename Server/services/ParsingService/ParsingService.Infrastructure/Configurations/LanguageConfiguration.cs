using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    public class LanguageConfiguration : IEntityTypeConfiguration<Language>
    {
        public void Configure(EntityTypeBuilder<Language> builder)
        {
            builder.ToTable(nameof(Language));

            builder.HasKey(lang => lang.Id);

            builder.Property(lang => lang.Id).HasColumnName("LanguageId").IsRequired();

            builder.HasIndex(lang => lang.Id).IsUnique();

            builder.Property(lang => lang.Name).IsRequired();

            builder.HasMany(lang => lang.Levels)
                .WithMany(level => level.Languages)
                .UsingEntity(
                level => level.HasOne(typeof(Level)).WithMany().HasForeignKey("LevelId"),
                lang => lang.HasOne(typeof(Language)).WithMany().HasForeignKey("LanguageId"));
        }
    }
}
