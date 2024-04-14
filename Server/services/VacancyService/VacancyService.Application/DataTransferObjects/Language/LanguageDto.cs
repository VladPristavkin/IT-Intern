namespace VacancyService.Application.DataTransferObjects
{
    public record LanguageDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required IEnumerable<LevelDto> Levels { get; set; }
    }
}
