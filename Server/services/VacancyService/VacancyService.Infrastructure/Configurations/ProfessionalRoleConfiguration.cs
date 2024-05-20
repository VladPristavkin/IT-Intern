using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class ProfessionalRoleConfiguration : IEntityTypeConfiguration<ProfessionalRole>
    {
        public void Configure(EntityTypeBuilder<ProfessionalRole> builder)
        {
            builder.ToTable(nameof(ProfessionalRole));

            builder.HasKey(pr => pr.Id);

            builder.Property(pr => pr.Id).HasColumnName("ProfessionalRoleId").IsRequired();

            builder.HasIndex(pr=>pr.Id).IsUnique();

            builder.Property(pr=>pr.Name).IsRequired();

            builder.HasOne(pr=>pr.Parent)
                .WithMany(pr=>pr.Roles)
                .HasForeignKey("ParentId")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
