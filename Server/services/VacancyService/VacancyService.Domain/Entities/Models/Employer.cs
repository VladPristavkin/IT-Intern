namespace VacancyService.Domain.Entities.Models
{
    /// <summary>
    /// Represents an employer thats posts a vacancies.
    /// </summary>
    public class Employer
    {
        /// <summary>
        /// Get or sets an unique id of the employer.
        /// </summary>
        public required long Id { get; set; }

        /// <summary>
        /// Gets or sets a name of the employer.
        /// </summary>
        public required string Name { get; set; }

        /// <summary>
        /// Gets or sets a url for logo.
        /// </summary>
        public string? LogoUrl { get; set; }

        //public string? AlternateUrl { get; set; }
        //public string? Url { get; set; }
    }
}
