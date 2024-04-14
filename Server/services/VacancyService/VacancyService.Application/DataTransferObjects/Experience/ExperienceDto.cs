namespace VacancyService.Application.DataTransferObjects
{
    public record ExperienceDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}
