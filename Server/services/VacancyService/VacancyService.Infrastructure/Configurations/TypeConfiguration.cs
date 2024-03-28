﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Type = VacancyService.Domain.Entities.Models.Type;

namespace VacancyService.Infrastructure.Configurations
{
    public class TypeConfiguration : IEntityTypeConfiguration<Type>
    {
        public void Configure(EntityTypeBuilder<Type> builder)
        {
            builder.ToTable(nameof(Type));

            builder.HasKey(type => type.Id);

            builder.Property(type => type.Id).HasColumnName("TypeId").IsRequired();

            builder.HasIndex(type => type.Id).IsUnique();

            builder.Property(type => type.Name).IsRequired();
        }
    }
}
