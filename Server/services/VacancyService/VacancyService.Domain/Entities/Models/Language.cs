namespace VacancyService.Domain.Entities.Models
{
    public class Language
    {
        public string Id { get; set; }
        public IEnumerable<Level> Levels { get; set; }
        public string Name { get; set; }
        public IEnumerable<Vacancy>? Vacancies { get; set; }
    }
}
