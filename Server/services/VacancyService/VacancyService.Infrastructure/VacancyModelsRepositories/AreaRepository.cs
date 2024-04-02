using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class AreaRepository : RepositoryBase<Area>, IAreaRepository
    {
        public AreaRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateArea(Area area) => Create(area);
        
        public void DeleteArea(Area area) => Delete(area);

        public Area? GetAreaById(long id, bool trackChanges) =>
            FindByExpression(a => a.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Area?> GetAreaByIdAsync(long id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(a => a.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public IEnumerable<Area> GetAreas(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Area>> GetAreasAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public void UpdateArea(Area area) => Update(area);
    }
}
