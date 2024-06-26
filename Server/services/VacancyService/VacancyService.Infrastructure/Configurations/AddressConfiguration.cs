﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Infrastructure.Configurations
{
    internal sealed class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable(nameof(Address));

            builder.HasKey(address => address.Id);

            builder.Property(address => address.Id).HasColumnName("AddressId").IsRequired();

            builder.HasIndex(address => address.Id).IsUnique();

            builder.HasMany(address => address.MetroStations)
                .WithMany(stations => stations.Addresses)
                .UsingEntity(
                m => m.HasOne(typeof(MetroStation)).WithMany().HasForeignKey("MetroStationId"),
                a => a.HasOne(typeof(Address)).WithMany().HasForeignKey("AddressId"));
        }
    }
}
