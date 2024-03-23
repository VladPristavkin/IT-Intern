using VacancyService.Domain.Interfaces.RepositoryInterfaces;

namespace VacancyService.Domain.Interfaces
{
    public interface IRepositoryManager
    {
        IVacancyRepository Vacancy { get; }

        public Task SaveAsync();
    }
}
