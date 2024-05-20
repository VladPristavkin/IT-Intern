namespace VacancyService.Domain.Entities.Models
{
    public class Level
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public IEnumerable<Language>? Languages { get; set; }
    }
}
