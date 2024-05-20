using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IEmploymentRepository : IRepositoryBase<Employment>
    {
        public void CreateEmployment(Employment employment);
        public void UpdateEmployment(Employment employment);
        public void DeleteEmployment(Employment employment);
        public IEnumerable<Employment> GetAll(bool trackChanges);
        public Task<IEnumerable<Employment>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Employment? GetById(string id, bool trackChanges);
        public Task<Employment?> GetByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
