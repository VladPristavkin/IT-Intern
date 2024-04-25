namespace ParsingService.Domain.Entities.Models
{
    public class KeySkill
    {
        public required string Name { get; set; }
        public IEnumerable<Vacancy>? Vacancies { get; set; }
    }
}
