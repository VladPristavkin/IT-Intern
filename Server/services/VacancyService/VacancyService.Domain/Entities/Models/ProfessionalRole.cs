namespace VacancyService.Domain.Entities.Models
{
    public class ProfessionalRole
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ProfessionalRole>? Roles { get; set; }
        public IEnumerable<Vacancy>? Vacancies { get; set; }
    }
}
