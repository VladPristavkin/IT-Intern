namespace VacancyService.Domain.Entities.Models
{
    /// <summary>
    /// Represents a job vacancy with details from various sources. 
    /// </summary>
    public class Vacancy
    {
        /// <summary>
        /// Gets or sets the unique identifier ot the vacancy.
        /// </summary>
        public required long Id { get; set; }

        /// <summary>
        /// Gets or sets the unique name of the vacancy. 
        /// </summary>
        public required string Name { get; set; }

        /// <summary>
        /// Gets or sets the description of the vacancy.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the value of: whether the vacancy has been archived.
        /// </summary>
        public bool Archived { get; set; }

        /// <summary>
        /// Gets or sets the address of vacancy.
        /// </summary>
        public Address? Address { get; set; }

        /// <summary>
        /// Gets or sets the area where the address located.
        /// </summary>
        public Area? Area { get; set; }

        /// <summary>
        /// Gets or sets information about the employer.
        /// </summary>
        public Employer? Employer { get; set; }

        /// <summary>
        /// Gets or sets the type of employment.
        /// </summary>
        public Employment? Employment { get; set; }

        /// <summary>
        /// Gets or sets information about the user experience.
        /// </summary>
        public Experience? Experience { get; set; }

        /// <summary>
        /// Gets or sets the collection of key skills.
        /// </summary>
        public IEnumerable<KeySkill>? KeySkills { get; set; }

        /// <summary>
        /// Gets or sets the collection of languages for the vacancy.
        /// </summary>
        public IEnumerable<Language>? Languages { get; set; }

        /// <summary>
        /// Gets or sets the collection of professtionl roles for the vacancy.
        /// </summary>
        public IEnumerable<ProfessionalRole>? ProfessionalRoles { get; set; }

        /// <summary>
        /// Gets or sets the time when the vacancy was published.
        /// </summary>
        public DateTime PublishedAt { get; set; }

        /// <summary>
        /// Gets or sets the salary of vacancy.
        /// </summary>
        public Salary? Salary { get; set; }

        /// <summary>
        /// Gets or sets the work schedule for the vacancy.
        /// </summary>
        public Schedule? Schedule { get; set; }

        /// <summary>
        /// Gets or sets the type of vacancy.
        /// </summary>
        public Type? Type { get; set; }

        #region Parsing metadata fields

        /// <summary>
        /// Gets or sets the name of the website where the vacancy was found.
        /// </summary>
        public required string WebsiteName { get; set; }

        /// <summary>
        /// Gets or sets the basic url for this vacancy.
        /// </summary>
        public string? OriginUrl { get; set; }

        /// <summary>
        /// Gets or sets the url to apply to the original site.
        /// </summary>
        public string? ApplyAlternateUrl { get; set; }

        /// <summary>
        /// Gets or sets the time when the vacancy was parsing.
        /// </summary>
        public DateTime ParsingTime {  get; set; }

        #endregion
    }
}
