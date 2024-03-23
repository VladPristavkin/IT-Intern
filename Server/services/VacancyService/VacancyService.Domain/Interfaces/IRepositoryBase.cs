using System.Linq.Expressions;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IRepositoryBase<T> where T : class
    {
        public void Create(T entity);
        public void Update(T entity);
        public void Delete(T entity);
        public IQueryable<T> FindAll(bool trackChanges);
        public IQueryable<T> FingByExpression(Expression<Func<T, bool>> expression, bool trackChanges);
    }
}
