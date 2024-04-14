using VacancyService.Infrastructure.DbContexts;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using Type = VacancyService.Domain.Entities.Models.Type;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class TypeRepository : RepositoryBase<Type>, ITypeRepository
    {
        public TypeRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateType(Type type) => Create(type);

        public void DeleteType(Type type) => Delete(type);

        public IEnumerable<Type> GetAll(bool trackChanges) =>
            FindAll(trackChanges).ToList();

        public async Task<IEnumerable<Type>> GetAllAsync(bool trackChanges, 
            CancellationToken token = default) =>
            await FindAll(trackChanges)
            .ToListAsync(token);

        public Type? GetTypeById(string id, bool trackChanges) =>
            FindByExpression(t => t.Id.Equals(id), trackChanges)
            .SingleOrDefault();

        public async Task<Type?> GetTypeByIdAsync(string id, 
            bool trackChanges, 
            CancellationToken token = default) =>
            await FindByExpression(t => t.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync(token);

        public void UpdateType(Type type) => Update(type);
    }
}