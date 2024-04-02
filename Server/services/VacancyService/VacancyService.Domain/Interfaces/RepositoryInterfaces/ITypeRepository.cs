using Type = VacancyService.Domain.Entities.Models.Type;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface ITypeRepository : IRepositoryBase<Type>
    {
        public void CreateType(Type type);
        public void DeleteType(Type type);
        public void UpdateType(Type type);
        public IEnumerable<Type> GetAll(bool trackChanges);
        public Task<IEnumerable<Type>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Type? GetTypeById(string id, bool trackChanges);
        public Task<Type?> GetTypeByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
