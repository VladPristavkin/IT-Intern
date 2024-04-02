using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class MetroStationRepository : RepositoryBase<MetroStation>, IMetroStationRepository
    {
        public MetroStationRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateMetroStation(MetroStation metroStation) => Create(metroStation);

        public void DeleteMetroStation(MetroStation metroStation) => Delete(metroStation);

        public IEnumerable<MetroStation> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<MetroStation>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public MetroStation? GetMetroStationById(long id, bool trackChanges) =>
            FindByExpression(m => m.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<MetroStation?> GetMetroStationByIdAsync(long id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(m => m.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateMetroStation(MetroStation metroStation) => Update(metroStation);
    }
}