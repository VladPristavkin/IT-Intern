using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IMetroLineRepository
    {
        public void CreateMetroLine(MetroLine metroLine);
        public void UpdateMetroLine(MetroLine metroLine);
        public void DeleteMetroLine(MetroLine metroLine);
        public IEnumerable<MetroLine> GetAll(bool trackChanges);
        public Task<IEnumerable<MetroLine>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public MetroLine? GetMetroLineById(long id, bool trackChanges);
        public Task<MetroLine?> GetMetroLineByIdAsync(long id, bool trackChanges, CancellationToken token = default);
    }
}
