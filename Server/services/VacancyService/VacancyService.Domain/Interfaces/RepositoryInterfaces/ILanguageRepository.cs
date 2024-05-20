using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface ILanguageRepository
    {
        public void CreateLanguage(Language language);
        public void UpdateLanguage(Language language);
        public void DeleteLanguage(Language language);
        public IEnumerable<Language> GetAll(bool trackChanges);
        public Task<IEnumerable<Language>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Language? GetLanguageById(string id, bool trackChanges);
        public Task<Language?> GetLanguageByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
