namespace VacancyService.Domain.Entities.Models
{
    public class ProfessionalRole
    {
        public required long Id { get; set; }
        public required string Name { get; set; }
        public ProfessionalRole? Parent { get; set; }
        public IEnumerable<ProfessionalRole>? Roles { get; set; }
    }
}
