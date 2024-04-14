namespace VacancyService.Application.DataTransferObjects
{
    public class EmployerForUpdateDto
    {
        public string? IdFromBasicWebsite { get; set; }

        public required string Name { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }
    }
}
