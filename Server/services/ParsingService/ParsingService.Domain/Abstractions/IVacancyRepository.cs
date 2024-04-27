using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IVacancyRepository
    {
        public Task CreateVacancyAsync(Vacancy vacancy);

        public Task UpdateVacancyAsync(Vacancy vacancy);

        public Task DeleteVacancy(long id);

        public Task DeleteVacancies(params Vacancy[] vacancies);

        public Task<Vacancy> GetVacancyByIdAsync(long id);

        public Task<IEnumerable<Vacancy>> GetFirstOneHundredVacancies();

        public Task<long> GetCount();
    }
}
