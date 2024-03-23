namespace VacancyService.Domain.Entities.Models
{
    public class Level
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Language>? Languages { get; set; }
    }
}
