using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IExperienceRepository : IRepositoryBase<Experience>
    {
        public void CreateExperience(Experience experience);
        public void UpdateExperience(Experience experience);
        public void DeleteExperience(Experience experience);
        public IEnumerable<Experience> GetAllExperience(bool trackChanges);
        public Task<IEnumerable<Experience>> GetAllExperienceAsync(bool trackChanges, CancellationToken token = default);
        public Experience? GetExperienceById(string id, bool trackChanges);
        public Task<Experience?> GetExperienceByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
