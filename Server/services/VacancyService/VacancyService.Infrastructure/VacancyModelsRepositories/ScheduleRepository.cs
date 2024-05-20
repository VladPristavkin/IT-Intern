using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class ScheduleRepository : RepositoryBase<Schedule>, IScheduleRepository
    {
        public ScheduleRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateSchedule(Schedule schedule) => Update(schedule);

        public void DeleteSchedule(Schedule schedule) => Delete(schedule);

        public IEnumerable<Schedule> GetAll(bool trackChanges) =>
            FindAll(trackChanges)
            .ToList();

        public async Task<IEnumerable<Schedule>> GetAllAsync(bool trackChanges,
            CancellationToken token = default) =>
            await FindAll(trackChanges)
            .ToListAsync(token);

        public Schedule? GetScheduleById(string id, bool trackChanges) =>
            FindByExpression(s => s.Id.Equals(id), trackChanges)
            .SingleOrDefault();

        public async Task<Schedule?> GetScheduleByIdAsync(string id,
            bool trackChanges,
            CancellationToken token = default) =>
            await FindByExpression(s => s.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync(token);

        public void UpdateSchedule(Schedule schedule) => Update(schedule);
    }
}