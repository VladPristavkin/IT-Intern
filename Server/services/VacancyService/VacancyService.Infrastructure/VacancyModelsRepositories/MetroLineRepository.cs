using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class MetroLineRepository : RepositoryBase<MetroLine>, IMetroLineRepository
    {
        public MetroLineRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateMetroLine(MetroLine metroLine) => Create(metroLine);

        public void DeleteMetroLine(MetroLine metroLine) => Delete(metroLine);

        public IEnumerable<MetroLine> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<MetroLine>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public MetroLine? GetMetroLineById(long id, bool trackChanges) =>
            FindByExpression(m => m.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<MetroLine?> GetMetroLineByIdAsync(long id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(m => m.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateMetroLine(MetroLine metroLine) => Update(metroLine);
    }
}