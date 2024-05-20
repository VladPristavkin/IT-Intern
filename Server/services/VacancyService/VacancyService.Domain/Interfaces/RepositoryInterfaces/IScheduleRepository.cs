using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IScheduleRepository : IRepositoryBase<Schedule>
    {
        public void CreateSchedule(Schedule schedule);
        public void UpdateSchedule(Schedule schedule);
        public void DeleteSchedule(Schedule schedule);
        public IEnumerable<Schedule> GetAll(bool trackChanges);
        public Task<IEnumerable<Schedule>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public Schedule? GetScheduleById(string id, bool trackChanges);
        public Task<Schedule?> GetScheduleByIdAsync(string id, bool trackChanges, CancellationToken token = default);
    }
}
