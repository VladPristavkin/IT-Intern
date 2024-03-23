namespace VacancyService.Domain.Entities.Models
{
    public class KeySkill
    {
        public string Name { get; set; }
        public IEnumerable<Vacancy>? Vacancies { get; set; }
    }
}
