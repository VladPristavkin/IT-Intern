using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IVacancyRepository : IRepositoryBase<Vacancy>
    {
        public IEnumerable<Vacancy> GetAll(bool trackChanges);
        public Task<IEnumerable<Vacancy>> GetAllAsync(bool trackChanges, CancellationToken cancellationToken);
        public Vacancy? GetVacancyById(long id, bool trackChanges);
        public Task<Vacancy?> GetVacancyByIdAsync(long id, bool trackChanges, CancellationToken cancellationToken);
        public void DeleveVacancy(Vacancy vacancy);
        public void UpdateVacancy(long id, Vacancy vacancy);
        public void CreateVacancy(Vacancy vacancy);
    }
}
