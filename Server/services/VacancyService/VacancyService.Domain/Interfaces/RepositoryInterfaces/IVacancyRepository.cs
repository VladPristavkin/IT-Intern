using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IVacancyRepository : IRepositoryBase<Vacancy>
    {
        public IEnumerable<Vacancy> GetAll(bool trackChanges);
        public Task<IEnumerable<Vacancy>> GetAllAsync(bool trackChanges, CancellationToken cancellationToken);
        public Vacancy GetVacancyById(int id, bool trackChanges);
        public Task<Vacancy> GetVacancyByIdAsync(int id, bool trackChanges, CancellationToken cancellationToken);
        public void DeleveVacancy(Vacancy vacancy);
        public void UpdateVacancy(int id, Vacancy vacancy);
        public void CreateVacancy(Vacancy vacancy);
    }
}
