namespace VacancyService.Domain.Entities.Models
{
    public class Area
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
        public Area? Parent { get; set; }
        public required string Name { get; set; }
        public IEnumerable<Area>? Areas { get; set; }
        public IEnumerable<MetroLine>? Lines { get; set; }
    }
}
