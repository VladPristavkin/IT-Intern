using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface ILevelRepository
    {
        public void CreateLevel(Level level);
        public void UpdateLevel(Level level);
        public void DeleteLevel(Level level);
        public IEnumerable<Level> GetAll(bool trackChanges);
        public Task<IEnumerable<Level>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Level? GetLevelById(string id, bool trackChanges);
        public Task<Level?> GetLevelByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
