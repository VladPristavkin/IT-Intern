using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infastrucrure.DbContexts;

namespace VacancyService.Infastrucrure.VacancyModelsRepositories
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

        public Vacancy GetVacancyById(int id, bool trackChanges) =>
            FingByExpression(v => v.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Vacancy> GetVacancyByIdAsync(int id, bool trackChanges, CancellationToken cancellationToken = default) =>
           await FingByExpression(v => v.Id.Equals(id), trackChanges).SingleOrDefaultAsync(cancellationToken);

        public void UpdateVacancy(int id, Vacancy vacancy) => Update(vacancy);
    }
}
