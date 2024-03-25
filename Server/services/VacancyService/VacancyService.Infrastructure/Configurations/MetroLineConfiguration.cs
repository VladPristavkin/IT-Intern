using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class MetroLineConfiguration : IEntityTypeConfiguration<MetroLine>
    {
        public void Configure(EntityTypeBuilder<MetroLine> builder)
        {
        
        }
    }
}
