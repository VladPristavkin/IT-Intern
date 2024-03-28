using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    internal sealed class EmployerConfiguration : IEntityTypeConfiguration<Employer>
    {
        public void Configure(EntityTypeBuilder<Employer> builder)
        {
            builder.ToTable(nameof(Employer));

            builder.HasKey(emp=>emp.Id);

            builder.Property(emp=>emp.Id).HasColumnName("EmployerId").IsRequired();

            builder.HasIndex(emp=>emp.Id).IsUnique();

            builder.Property(emp=>emp.Name).IsRequired();
        }
    }
}
