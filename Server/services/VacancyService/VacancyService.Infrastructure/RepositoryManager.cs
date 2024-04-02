using VacancyService.Domain.Interfaces;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;
using VacancyService.Infrastructure.VacancyModelsRepositories;

namespace VacancyService.Infrastructure.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly Lazy<IAreaRepository> _area;
        private readonly Lazy<IEmployerRepository> _employer;
        private readonly Lazy<IEmploymentRepository> _employment;
        private readonly Lazy<IExperienceRepository> _experience;
        private readonly Lazy<IKeySkillRepository> _keySkill;
        private readonly Lazy<ILanguageRepository> _language;
        private readonly Lazy<ILevelRepository> _level;
        private readonly Lazy<IMetroLineRepository> _metroLine;
        private readonly Lazy<IMetroStationRepository> _metroStation;
        private readonly Lazy<IProfessionalRoleRepository> _professionalRole;
        private readonly Lazy<IScheduleRepository> _schedule;
        private readonly Lazy<ITypeRepository> _type;
        private readonly Lazy<IVacancyRepository> _vacancy;

        public RepositoryManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            _area = new Lazy<IAreaRepository>(() => new AreaRepository(_dbContext));
            _employer = new Lazy<IEmployerRepository>(() => new EmployerRepository(_dbContext));
            _employment = new Lazy<IEmploymentRepository>(() => new EmploymentRepository(_dbContext));
            _experience = new Lazy<IExperienceRepository>(() => new ExperienceRepository(_dbContext));
            _keySkill = new Lazy<IKeySkillRepository>(() => new KeySkillRepository(_dbContext));
            _language = new Lazy<ILanguageRepository>(() => new LanguageRepository(_dbContext));
            _level = new Lazy<ILevelRepository>(() => new LevelRepository(_dbContext));
            _metroLine = new Lazy<IMetroLineRepository>(() => new MetroLineRepository(_dbContext));
            _metroStation = new Lazy<IMetroStationRepository>(() => new MetroStationRepository(_dbContext));
            _professionalRole = new Lazy<IProfessionalRoleRepository>(() => new ProfessionalRoleRepository(_dbContext));
            _schedule = new Lazy<IScheduleRepository>(() => new ScheduleRepository(_dbContext));
            _type = new Lazy<ITypeRepository>(() => new TypeRepository(_dbContext));
            _vacancy = new Lazy<IVacancyRepository>(() => new VacancyRepository(_dbContext));
        }

        public async Task SaveAsync() => await _dbContext.SaveChangesAsync();

        public IVacancyRepository Vacancy => _vacancy.Value;

        public IAreaRepository Area => _area.Value;

        public IEmployerRepository Employer => _employer.Value;

        public IEmploymentRepository Employment => _employment.Value;

        public IExperienceRepository Experience => _experience.Value;

        public IKeySkillRepository KeySkill => _keySkill.Value;

        public ILanguageRepository Language => _language.Value;

        public ILevelRepository Level => _level.Value;

        public IMetroLineRepository MetroLine => _metroLine.Value;

        public IMetroStationRepository MetroStation => _metroStation.Value;

        public IProfessionalRoleRepository ProfessionalRole => _professionalRole.Value;

        public IScheduleRepository Schedule => _schedule.Value;

        public ITypeRepository Type => _type.Value;
    }
}
