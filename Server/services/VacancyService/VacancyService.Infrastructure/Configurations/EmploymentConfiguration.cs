using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infastrucrure.Configurations
{
    public class EmploymentConfiguration : IEntityTypeConfiguration<Employment>
    {
        public void Configure(EntityTypeBuilder<Employment> builder)
        {

        }
    }
}
