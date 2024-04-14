namespace VacancyService.Application.DataTransferObjects
{
    public record EmployerDto
    {
        public required long Id { get; set; }

        public required string Name { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }
    }
}
