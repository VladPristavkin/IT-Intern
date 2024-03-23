namespace VacancyService.Domain.Entities.Models
{
    public class Vacancy
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string WebsiteName { get; set; }
        public Address? Address { get; set; }
        public string? AlternateUrl { get; set; }
        public string? ApplyAlternateUrl { get; set; }
        public Area? Area { get; set; }
        public string? Description { get; set; }
        public Employer? Employer { get; set; }
        public Employment? Employment { get; set; }
        public Experience? Experience { get; set; }
        public string? WebsiteId { get; set; }
        public IEnumerable<KeySkill>? KeySkills { get; set; }
        public IEnumerable<Language>? Languages { get; set; }
        public IEnumerable<ProfessionalRole>? ProfessionalRoles { get; set; }
        public DateTime? PublishedAt { get; set; }
        public Salary? Salary { get; set; }
        public Schedule? Schedule { get; set; }
        public Type? Type { get; set; }
    }
}
