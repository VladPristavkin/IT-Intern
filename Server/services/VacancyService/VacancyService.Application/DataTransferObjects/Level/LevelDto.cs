namespace VacancyService.Application.DataTransferObjects
{
    public record LevelDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}
