using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class ExperienceRepository : RepositoryBase<Experience>, IExperienceRepository
    {
        public ExperienceRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateExperience(Experience experience) => Create(experience);

        public void DeleteExperience(Experience experience) => Delete(experience);

        public IEnumerable<Experience> GetAllExperience(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Experience>> GetAllExperienceAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public Experience? GetExperienceById(string id, bool trackChanges) =>
            FindByExpression(e => e.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Experience?> GetExperienceByIdAsync(string id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(e => e.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateExperience(Experience experience) => Update(experience);
    }
}
