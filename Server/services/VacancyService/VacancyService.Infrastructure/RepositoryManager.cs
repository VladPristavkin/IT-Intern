using VacancyService.Domain.Interfaces;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;
using VacancyService.Infrastructure.VacancyModelsRepositories;

namespace VacancyService.Infrastructure.Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Lazy<IVacancyRepository> FullVacancies;

        public RepositoryManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            FullVacancies = new Lazy<IVacancyRepository>(() => new VacancyRepository(_dbContext));
        }

        public async Task SaveAsync() => await _dbContext.SaveChangesAsync();

        public IVacancyRepository Vacancy => FullVacancies.Value;
    }
}
