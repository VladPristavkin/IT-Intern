namespace VacancyService.Application.DataTransferObjects
{
    public record EmploymentDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}
