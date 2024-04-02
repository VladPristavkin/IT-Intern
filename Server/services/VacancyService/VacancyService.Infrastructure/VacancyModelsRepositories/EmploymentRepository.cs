using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class EmploymentRepository : RepositoryBase<Employment>, IEmploymentRepository
    {
        public EmploymentRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateEmployment(Employment employment) => Create(employment);

        public void DeleteEmployment(Employment employment) => Delete(employment);

        public IEnumerable<Employment> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Employment>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public Employment? GetById(string id, bool trackChanges) =>
            FindByExpression(e => e.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Employment?> GetByIdAsync(string id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(e => e.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateEmployment(Employment employment) => Update(employment);
    }
}
