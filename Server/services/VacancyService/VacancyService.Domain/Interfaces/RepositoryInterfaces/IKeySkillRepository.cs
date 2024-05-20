using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IKeySkillRepository : IRepositoryBase<KeySkill>
    {
        public void CreateKeySkill(KeySkill keySkill);
        public void DeleteKeySkill(KeySkill keySkill);
        public void UpdateKeySkill(KeySkill keySkill);
        public IEnumerable<KeySkill> GetAll(bool trackChanges);
        public Task<IEnumerable<KeySkill>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public KeySkill? GetSkillById(string name, bool trackChanges);
        public Task<KeySkill?> GetSkillByIdAsync(string name, bool trackChanges, CancellationToken token = default);
    }
}
