﻿namespace VacancyService.Application.DataTransferObjects
{
    public class VacancyDto
    {
        public required long Id { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        public bool Archived { get; set; }

        public DateTime PublishedAt { get; set; }

        public AddressDto? Address { get; set; }

        public AreaForVacancyDto? Area { get; set; }

        public AreaForVacancyDto? Country { get; set; }

        public EmployerDto? Employer { get; set; }

        public EmploymentDto? Employment { get; set; }

        public ExperienceDto? Experience { get; set; }

        public SalaryDto? Salary { get; set; }

        public ScheduleDto? Schedule { get; set; }

        public TypeDto? Type { get; set; }

        public IEnumerable<KeySkillDto>? KeySkills { get; set; }

        public IEnumerable<LanguageDto>? Languages { get; set; }

        public IEnumerable<ProfessionalRoleDto>? ProfessionalRoles { get; set; }

        #region Parsing metadata fields

        public required string WebsiteName { get; set; }
        public required string WebsiteLogoUrl { get; set; }
        public required string WebsiteUrl { get; set; }
        public required string OriginalVacancyUrl { get; set; }
        public DateTime ParsingTime { get; set; }

        #endregion
    }
}
