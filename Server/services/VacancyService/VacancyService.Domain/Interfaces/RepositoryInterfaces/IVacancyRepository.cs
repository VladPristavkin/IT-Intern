using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IVacancyRepository : IRepositoryBase<Vacancy>
    {
        public IEnumerable<Vacancy> GetAll(VacancyParameters vacancyParameters, bool trackChanges);
        public Task<IEnumerable<Vacancy>> GetAllAsync(VacancyParameters vacancyParameters, bool trackChanges, CancellationToken cancellationToken = default);
        public Vacancy? GetVacancyById(VacancyParameters vacancyParameters, long id, bool trackChanges);
        public Task<Vacancy?> GetVacancyByIdAsync(VacancyParameters vacancyParameters, long id, bool trackChanges, CancellationToken cancellationToken = default);
        public void DeleveVacancy(Vacancy vacancy);
        public void UpdateVacancy(Vacancy vacancy);
        public void CreateVacancy(Vacancy vacancy);
        public Task<long> CountAsync(VacancyParameters vacancyParameters, CancellationToken cancellationToken = default);
    }
}
