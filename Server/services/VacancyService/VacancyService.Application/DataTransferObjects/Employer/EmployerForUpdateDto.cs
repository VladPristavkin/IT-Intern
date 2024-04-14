﻿namespace VacancyService.Application.DataTransferObjects
{
    public class EmployerForUpdateDto
    {
        public required long Id {  get; set; }

        public string? IdFromBasicWebsite { get; set; }

        public required string Name { get; set; }

        public string? LogoUrl { get; set; }

        public string? Description { get; set; }
    }
}
