using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class MetroStationConfiguration : IEntityTypeConfiguration<MetroStation>
    {
        public void Configure(EntityTypeBuilder<MetroStation> builder)
        {

        }
    }
}
