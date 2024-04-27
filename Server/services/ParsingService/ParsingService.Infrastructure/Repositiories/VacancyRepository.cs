using Microsoft.EntityFrameworkCore;
using ParsingService.Domain.Abstractions;
using ParsingService.Domain.Entities.Models;
using ParsingService.Infrastructure.DbContexts;

namespace ParsingService.Infrastructure.Repositiories
{
    public sealed class VacancyRepository(ParsingDbContext dbContext) : IVacancyRepository
    {
        private ParsingDbContext _context = dbContext;

        public async Task CreateVacancyAsync(Vacancy vacancy)
        {
            await _context.Vacancies.AddAsync(vacancy);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVacancies(params Vacancy[] vacancies)
        {
            _context.Vacancies.RemoveRange(vacancies);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVacancy(long id)
        {
            var vacancy = await GetVacancyByIdAsync(id) ?? throw new Exception($"Vacancy {id} not found.");
            _context.Vacancies.Remove(vacancy);
            await _context.SaveChangesAsync();
        }

        public async Task<long> GetCount() =>
            await _context.Vacancies.AsNoTracking().CountAsync();

        public async Task<IEnumerable<Vacancy>> GetFirstOneHundredVacancies() =>
            await _context.Vacancies.AsQueryable().Take(100).ToListAsync();

        public async Task<Vacancy> GetVacancyByIdAsync(long id) =>
            await _context.Vacancies.AsQueryable().Where(v => v.Id.Equals(id)).SingleOrDefaultAsync();

        public async Task UpdateVacancyAsync(Vacancy vacancy)
        {
            _context.Vacancies.Update(vacancy);
            await _context.SaveChangesAsync();
        }
    }
}
