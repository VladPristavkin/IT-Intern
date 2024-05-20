namespace VacancyService.Domain.Entities.Models
{
    public class Vacancy
    {
        public required long Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public bool Archived { get; set; }
        public DateTime PublishedAt { get; set; }
        public Address? Address { get; set; }
        public Area? Area { get; set; }
        public Employer? Employer { get; set; }
        public Employment? Employment { get; set; }
        public Experience? Experience { get; set; }
        public Salary? Salary { get; set; }
        public Schedule? Schedule { get; set; }
        public Type? Type { get; set; }
        public IEnumerable<KeySkill>? KeySkills { get; set; }
        public IEnumerable<Language>? Languages { get; set; }
        public IEnumerable<ProfessionalRole>? ProfessionalRoles { get; set; }

        #region Parsing metadata fields

        public required string WebsiteName { get; set; }
        public required string WebsiteLogoUrl { get; set; }
        public required string WebsiteUrl { get; set; }
        public required string OriginalVacancyUrl { get; set; }
        public DateTime ParsingTime { get; set; }

        #endregion
    }
}
