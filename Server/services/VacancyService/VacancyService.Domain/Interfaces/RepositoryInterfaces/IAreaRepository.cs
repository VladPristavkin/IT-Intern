using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IAreaRepository : IRepositoryBase<Area>
    {
        public IEnumerable<Area> GetAreas(bool trackChanges);
        public Task<IEnumerable<Area>> GetAreasAsync(bool trackChanges, CancellationToken token = default);
        public Area? GetAreaById(long id, bool trackChanges);
        public Task<Area?> GetAreaByIdAsync(long id, bool trackChanges, CancellationToken token = default);
        public void DeleteArea(Area area);
        public void UpdateArea(Area area);
        public void CreateArea(Area area);
    }
}
