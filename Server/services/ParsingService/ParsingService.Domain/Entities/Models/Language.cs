namespace ParsingService.Domain.Entities.Models
{
    public class Language
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required IEnumerable<Level> Levels { get; set; }
    }
}
