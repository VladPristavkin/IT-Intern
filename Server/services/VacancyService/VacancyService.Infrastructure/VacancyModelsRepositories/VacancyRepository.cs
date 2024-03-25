using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    public class VacancyRepository : RepositoryBase<Vacancy>, IVacancyRepository
    {
        public VacancyRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateVacancy(Vacancy vacancy) => Create(vacancy);

        public void DeleveVacancy(Vacancy vacancy) => Delete(vacancy);

        public IEnumerable<Vacancy> GetAll(bool trackChanges) =>
            FindAll(trackChanges).OrderBy(v => v.Name).ToList();

        public async Task<IEnumerable<Vacancy>> GetAllAsync(bool trackChanges, CancellationToken cancellationToken = default) =>
           await FindAll(trackChanges).OrderBy(v => v.Name).ToListAsync(cancellationToken);

        public Vacancy? GetVacancyById(long id, bool trackChanges) =>
            FingByExpression(v => v.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Vacancy?> GetVacancyByIdAsync(long id, bool trackChanges, CancellationToken cancellationToken = default) =>
           await FingByExpression(v => v.Id.Equals(id), trackChanges).SingleOrDefaultAsync(cancellationToken);

        public void UpdateVacancy(long id, Vacancy vacancy) => Update(vacancy);
    }
}
