using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class LevelRepository : RepositoryBase<Level>, ILevelRepository
    {
        public LevelRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateLevel(Level level) => Create(level);

        public void DeleteLevel(Level level) => Delete(level);

        public IEnumerable<Level> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Level>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public Level? GetLevelById(string id, bool trackChanges) =>
            FindByExpression(l => l.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Level?> GetLevelByIdAsync(string id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(l => l.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateLevel(Level level) => Update(level);
    }
}