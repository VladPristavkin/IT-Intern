namespace VacancyService.Domain.Entities.Models
{
    public class Employer
    {
        public long Id { get; set; }
        public string? AlternateUrl { get; set; }
        public string? LogoUrl { get; set; }
        public string? Name { get; set; }
        public bool? Trusted { get; set; }
        public string? Url { get; set; }
    }
}
