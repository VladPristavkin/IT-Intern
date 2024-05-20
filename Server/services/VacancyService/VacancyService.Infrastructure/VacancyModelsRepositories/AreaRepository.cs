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

#pragma warning disable CS8620 

        public Area? GetAreaById(long id, bool trackChanges) =>
            FindByExpression(a => a.Id.Equals(id), trackChanges)
            .Include(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .SingleOrDefault();

        public async Task<Area?> GetAreaByIdAsync(long id,
            bool trackChanges,
            CancellationToken token = default) =>
            await FindByExpression(a => a.Id.Equals(id), trackChanges)
            .Include(a=>a.Parent)
            .ThenInclude(a=>a.Parent)
            .ThenInclude(a => a.Parent)
            .ThenInclude(a => a.Parent)
            .Include(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .SingleOrDefaultAsync(token);

        public IEnumerable<Area> GetAreas(bool trackChanges) =>
            FindAll(trackChanges)
            .Where(a => a.Parent == null)
            .Include(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ToList();

        public async Task<IEnumerable<Area>> GetAreasAsync(bool trackChanges,
            CancellationToken token = default) =>
            await FindAll(trackChanges)
            .Where(a => a.Parent == null)
            .Include(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ToListAsync(token);

        public async Task<Area?> GetCountryByAreaAsync(long id, CancellationToken token = default)
        {
            var area = await GetAreaByIdAsync(id, false);

            while (area.Parent != null)
            {
                area = area.Parent;
            }

            return area;
        }

        public void UpdateArea(Area area) => Update(area);
    }
}
