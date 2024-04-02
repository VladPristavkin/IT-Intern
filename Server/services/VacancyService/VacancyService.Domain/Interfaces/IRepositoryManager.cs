using VacancyService.Domain.Interfaces.RepositoryInterfaces;

namespace VacancyService.Domain.Interfaces
{
    public interface IRepositoryManager
    {
        IVacancyRepository Vacancy { get; }
        IAreaRepository Area { get; }
        IEmployerRepository Employer { get; }
        IEmploymentRepository Employment { get; }
        IExperienceRepository Experience { get; }
        IKeySkillRepository KeySkill { get; }
        ILanguageRepository Language { get; }
        ILevelRepository Level { get; }
        IMetroLineRepository MetroLine { get; }
        IMetroStationRepository MetroStation { get; }
        IProfessionalRoleRepository ProfessionalRole { get; }
        IScheduleRepository Schedule { get; }
        ITypeRepository Type { get; }

        public Task SaveAsync();
    }
}
