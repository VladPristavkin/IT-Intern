using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infastrucrure.DbContexts;

namespace VacancyService.Infastrucrure
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationDbContext _dbContext;
        protected RepositoryBase(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public void Create(T entity)
        {
            _dbContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ? _dbContext.Set<T>().AsNoTracking() : _dbContext.Set<T>();

        public IQueryable<T> FingByExpression(Expression<Func<T, bool>> expression, bool trackChanges) =>
            !trackChanges ? _dbContext.Set<T>().Where(expression).AsNoTracking() : _dbContext.Set<T>().Where(expression);

        public void Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
        }
    }
}
