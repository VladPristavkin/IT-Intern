namespace VacancyService.Application.DataTransferObjects
{
    public class EmployerForCreationDto
    {
        public string? IdFromBasicWebsite { get; set; }

        public required string Name { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }

        public required string OriginalEmployerUrl { get; set; }
    }
}
