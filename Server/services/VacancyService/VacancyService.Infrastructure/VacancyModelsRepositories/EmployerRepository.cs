using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class EmployerRepository : RepositoryBase<Employer>, IEmployerRepository
    {
        public EmployerRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateEmployer(Employer employer) => Create(employer);

        public void DeleteEmployer(Employer employer) => Delete(employer);

        public IEnumerable<Employer> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Employer>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public Employer? GetEmployerById(long id, bool trackChanges) =>
            FindByExpression(e => e.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Employer?> GetEmployerByIdAsync(long id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(e => e.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateEmployer(Employer employer) => Update(employer);
    }
}
