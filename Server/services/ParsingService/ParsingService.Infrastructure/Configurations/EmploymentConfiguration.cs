using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    public class EmploymentConfiguration : IEntityTypeConfiguration<Employment>
    {
        public void Configure(EntityTypeBuilder<Employment> builder)
        {
            builder.ToTable(nameof(Employment));

            builder.HasKey(emp=>emp.Id);

            builder.Property(emp=>emp.Id).HasColumnName("EmploymentId").IsRequired();

            builder.HasIndex(emp=>emp.Id).IsUnique();

            builder.Property(emp=>emp.Name).IsRequired();
        }
    }
}
