﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    public class ProfessionalRoleConfiguration : IEntityTypeConfiguration<ProfessionalRole>
    {
        public void Configure(EntityTypeBuilder<ProfessionalRole> builder)
        {

        }
    }
}
