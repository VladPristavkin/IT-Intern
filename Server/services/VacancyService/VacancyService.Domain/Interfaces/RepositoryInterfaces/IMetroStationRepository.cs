using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IMetroStationRepository
    {
        public void CreateMetroStation(MetroStation metroStation);
        public void UpdateMetroStation(MetroStation metroStation);
        public void DeleteMetroStation(MetroStation metroStation);
        public IEnumerable<MetroStation> GetAll(bool trackChanges);
        public Task<IEnumerable<MetroStation>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public MetroStation? GetMetroStationById(double id, bool trackChanges);
        public Task<MetroStation?> GetMetroStationByIdAsync(double id, bool trackChanges, CancellationToken token = default);
    }
}
