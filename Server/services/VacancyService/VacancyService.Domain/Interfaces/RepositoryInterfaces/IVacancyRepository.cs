using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IVacancyRepository : IRepositoryBase<Vacancy>
    {
        public IEnumerable<Vacancy> GetAll(bool trackChanges,
            VacancyParameters? vacancyParameters = default);

        public Task<IEnumerable<Vacancy>> GetAllAsync(bool trackChanges,
            CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default);

        public Vacancy? GetVacancyById(long id,
            bool trackChanges,
            VacancyParameters? vacancyParameters = default);

        public Task<Vacancy?> GetVacancyByIdAsync(long id,
            bool trackChanges,
            CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default);

        public void DeleveVacancy(Vacancy vacancy);

        public void UpdateVacancy(Vacancy vacancy);

        public void CreateVacancy(Vacancy vacancy);

        public Task<long> CountAsync(CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default);
    }
}
