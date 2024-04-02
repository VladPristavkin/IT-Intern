using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IEmployerRepository : IRepositoryBase<Employer>
    {
        public IEnumerable<Employer> GetAll(bool trackChanges);
        public Task<IEnumerable<Employer>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Employer? GetEmployerById(long id, bool trackChanges);
        public Task<Employer?> GetEmployerByIdAsync(long id, bool trackChanges, CancellationToken token = default);
        public void UpdateEmployer(Employer employer);
        public void DeleteEmployer(Employer employer);
        public void CreateEmployer(Employer employer);
    }
}
