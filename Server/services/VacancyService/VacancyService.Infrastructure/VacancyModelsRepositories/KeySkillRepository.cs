using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class KeySkillRepository : RepositoryBase<KeySkill>, IKeySkillRepository
    {
        public KeySkillRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateKeySkill(KeySkill keySkill) => Create(keySkill);

        public void DeleteKeySkill(KeySkill keySkill) => Delete(keySkill);

        public IEnumerable<KeySkill> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<KeySkill>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges).ToListAsync(token);

        public KeySkill? GetSkillById(string name, bool trackChanges) =>
            FindByExpression(k => k.Name.Equals(name), trackChanges).SingleOrDefault();

        public async Task<KeySkill?> GetSkillByIdAsync(string name, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(k => k.Name.Equals(name), trackChanges).SingleOrDefaultAsync(token);

        public void UpdateKeySkill(KeySkill keySkill) => Update(keySkill);
    }
}
