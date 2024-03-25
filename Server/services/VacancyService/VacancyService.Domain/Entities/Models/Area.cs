namespace VacancyService.Domain.Entities.Models
{
    /// <summary>
    /// Represents a country of a region of the country.
    /// </summary>
    public class Area
    {
        /// <summary>
        /// Gets or sets the unique value of area.
        /// </summary>
        public required long Id { get; set; }

        /// <summary>
        /// Gets or sets the unique name of the area.
        /// </summary>
        public required string Name { get; set; }

        /// <summary>
        /// Gets or sets an area higher in the hierarchy.
        /// </summary>
        public Area? Parent { get; set; }

        /// <summary>
        /// Gets or sets a collection of areas which dependent by this area.
        /// </summary>
        public IEnumerable<Area>? Areas { get; set; }

        /// <summary>
        /// Gets or sets a collection of metro lines which located in this area.
        /// </summary>
        public IEnumerable<MetroLine>? Lines { get; set; }
    }
}
