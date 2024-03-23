using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infastrucrure.Configurations
{
    public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
    {
        public void Configure(EntityTypeBuilder<Experience> builder)
        {

        }
    }
}
