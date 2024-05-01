using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    public class MetroLineConfiguration : IEntityTypeConfiguration<MetroLine>
    {
        public void Configure(EntityTypeBuilder<MetroLine> builder)
        {
            builder.ToTable(nameof(MetroLine));

            builder.HasIndex(ml => ml.Id);

            builder.Property(ml => ml.Id).HasColumnName("MetrolLineId").IsRequired();

            builder.HasIndex(ml => ml.Id).IsUnique();

            builder.Property(ml => ml.Name).IsRequired();

            builder.Property(ml=>ml.HexColor).HasMaxLength(7);

            builder.HasMany(ml => ml.Stations)
                .WithOne(ms => ms.Line)
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
