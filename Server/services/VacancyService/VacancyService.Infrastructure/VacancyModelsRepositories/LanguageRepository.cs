using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class LanguageRepository : RepositoryBase<Language>, ILanguageRepository
    {
        public LanguageRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateLanguage(Language language) => Create(language);

        public void DeleteLanguage(Language language) => Delete(language);

        public IEnumerable<Language> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Language>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public Language? GetLanguageById(string id, bool trackChanges) =>
            FindByExpression(l => l.Id.Equals(id), trackChanges).SingleOrDefault();

        public async Task<Language?> GetLanguageByIdAsync(string id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(l => l.Id.Equals(id), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateLanguage(Language language) => Update(language);
    }
}