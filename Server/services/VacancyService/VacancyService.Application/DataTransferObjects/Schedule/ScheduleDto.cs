namespace VacancyService.Application.DataTransferObjects
{
    public record ScheduleDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}
