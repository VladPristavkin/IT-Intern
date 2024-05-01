using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Configurations
{
    internal sealed class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable(nameof(Address));

            builder.HasKey(address => address.Id);

            builder.Property(address => address.Id).HasColumnName("AddressId").IsRequired();

            builder.HasIndex(address => address.Id).IsUnique();

            builder.Property(address => address.Building).IsRequired();

            builder.Property(address => address.City).IsRequired();

            builder.Property(address => address.Street).IsRequired();

            builder.HasMany(address => address.MetroStations)
                .WithMany(stations => stations.Addresses)
                .UsingEntity(
                m => m.HasOne(typeof(MetroStation)).WithMany().HasForeignKey("MetroStationId"),
                a => a.HasOne(typeof(Address)).WithMany().HasForeignKey("AddressId"));
        }
    }
}
