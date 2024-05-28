namespace ParsingService.Domain.Entities.Models
{
    public class Employer
    {
        public required long Id { get; set; }

        public string? IdFromBasicWebsite { get; set; }

        public required string Name { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }

        public required string OriginalEmployerUrl { get; set; }
    }
}
