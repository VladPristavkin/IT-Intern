namespace VacancyService.Domain.Entities.Models
{
    /// <summary>
    /// Represents address for vacancy location.
    /// </summary>
    public class Address
    {
        /// <summary>
        /// Gets or sets the number of building.
        /// </summary>
        public required string Building { get; set; }

        /// <summary>
        /// Gets or sets the name of city.
        /// </summary>
        public required string City { get; set; }

        /// <summary>
        /// Gets or sets the name of street.
        /// </summary>
        public required string Street { get; set; }

        /// <summary>
        /// Gets or sets the description of the address.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the latitude of the address.
        /// </summary>
        public double Lat { get; set; }

        /// <summary>
        /// Gets or sets the longitude of the address.
        /// </summary>
        public double Lng { get; set; }

        /// <summary>
        /// Gets of sets a collection of subway stations near the address.
        /// </summary>
        public IEnumerable<MetroStation>? MetroStations { get; set; }
    }
}
