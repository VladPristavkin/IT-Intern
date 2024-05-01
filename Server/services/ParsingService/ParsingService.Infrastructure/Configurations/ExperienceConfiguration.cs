using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
    {
        public void Configure(EntityTypeBuilder<Experience> builder)
        {
            builder.ToTable(nameof(Experience));

            builder.HasKey(exp => exp.Id);

            builder.Property(exp => exp.Id).HasColumnName("ExperienceId").IsRequired();

            builder.HasIndex(exp=> exp.Id).IsUnique();

            builder.Property(exp=>exp.Name).IsRequired();
        }
    }
}
