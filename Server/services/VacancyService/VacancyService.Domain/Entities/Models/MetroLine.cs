namespace VacancyService.Domain.Entities.Models
{
    public class MetroLine
    {
        public required long Id { get; set; }
        public string? Name { get; set; }
        public string? HexColor { get; set; }
        public Area? Area { get; set; }
        public IEnumerable<MetroStation>? Stations { get; set; }
    }
}
