using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Domain.RequestFeatures;
using VacancyService.Infrastructure.DbContexts;
using VacancyService.Infrastructure.RepositoryExtensions;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class VacancyRepository : RepositoryBase<Vacancy>, IVacancyRepository
    {
        public VacancyRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<long> CountAsync(CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default)
        {
            vacancyParameters ??= new();

            return await FindAll(false)
             .FilterVacancy(vacancyParameters)
             .Search(vacancyParameters)
             .CountAsync(cancellationToken);
        }

        public void CreateVacancy(Vacancy vacancy) => Create(vacancy);

        public void DeleveVacancy(Vacancy vacancy) => Delete(vacancy);

#pragma warning disable CS8620

        public IEnumerable<Vacancy> GetAll(bool trackChanges,
            VacancyParameters? vacancyParameters = default)
        {
            vacancyParameters ??= new();

            return FindAll(trackChanges)
             .Include(v => v.Address)
             .Include(v => v.Area)
             .Include(v => v.Employer)
             .Include(v => v.Employment)
             .Include(v => v.Experience)
             .Include(v => v.Salary)
             .Include(v => v.Schedule)
             .Include(v => v.Type)
             .Include(v => v.KeySkills)
             .Include(v => v.Languages)
             .Include(v => v.ProfessionalRoles)
             .Include(v => v.Languages)
             .ThenInclude(l => l.Levels)
             .FilterVacancy(vacancyParameters)
             .Search(vacancyParameters)
             .Sort(vacancyParameters)
             .OrderBy(v => v.Name)
             .Skip((vacancyParameters.Page - 1) * vacancyParameters.PageSize)
             .Take(vacancyParameters.PageSize)
             .ToList();
        }

        public async Task<IEnumerable<Vacancy>> GetAllAsync(bool trackChanges,
            CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default)
        {
            vacancyParameters ??= new();

            var query = FindAll(trackChanges)
               .Include(v => v.Address)
               .Include(v => v.Area)
               .Include(v => v.Employer)
               .Include(v => v.Employment)
               .Include(v => v.Experience)
               .Include(v => v.Salary)
               .Include(v => v.Schedule)
               .Include(v => v.Type)
               .Include(v => v.KeySkills)
               .Include(v => v.Languages)
               .ThenInclude(l => l.Levels)
               .Include(v => v.ProfessionalRoles)
               .FilterVacancy(vacancyParameters)
               .Search(vacancyParameters)
               .Sort(vacancyParameters);

            return await query
                .Skip((vacancyParameters.Page - 1) * vacancyParameters.PageSize)
                .Take(vacancyParameters.PageSize)
                .ToListAsync(cancellationToken);
        }

        public Vacancy? GetVacancyById(long id,
            bool trackChanges,
            VacancyParameters? vacancyParameters = default)
        {
            vacancyParameters ??= new();

            return FindByExpression(v => v.Id.Equals(id), trackChanges)
            .Include(v => v.Address)
            .Include(v => v.Area)
            .Include(v => v.Employer)
            .Include(v => v.Employment)
            .Include(v => v.Experience)
            .Include(v => v.Salary)
            .Include(v => v.Schedule)
            .Include(v => v.Type)
            .Include(v => v.KeySkills)
            .Include(v => v.Languages)
            .Include(v => v.ProfessionalRoles)
            .Include(v => v.Languages)
            .ThenInclude(l => l.Levels)
            .FilterVacancy(vacancyParameters)
            .Search(vacancyParameters)
            .Sort(vacancyParameters)
            .Skip((vacancyParameters.Page - 1) * vacancyParameters.PageSize)
            .Take(vacancyParameters.PageSize)
            .SingleOrDefault();
        }

        public async Task<Vacancy?> GetVacancyByIdAsync(long id,
            bool trackChanges,
            CancellationToken cancellationToken = default,
            VacancyParameters? vacancyParameters = default)
        {
            vacancyParameters ??= new();

            return await FindByExpression(v => v.Id.Equals(id), trackChanges)
            .Include(v => v.Address)
            .Include(v => v.Area)
            .Include(v => v.Employer)
            .Include(v => v.Employment)
            .Include(v => v.Experience)
            .Include(v => v.Salary)
            .Include(v => v.Schedule)
            .Include(v => v.Type)
            .Include(v => v.KeySkills)
            .Include(v => v.Languages)
            .Include(v => v.ProfessionalRoles)
            .Include(v => v.Languages)
            .ThenInclude(l => l.Levels)
            .FilterVacancy(vacancyParameters)
            .Search(vacancyParameters)
            .Sort(vacancyParameters)
            .Skip((vacancyParameters.Page - 1) * vacancyParameters.PageSize)
            .Take(vacancyParameters.PageSize)
            .SingleOrDefaultAsync(cancellationToken);
        }

        public void UpdateVacancy(Vacancy vacancy) => Update(vacancy);
    }
}
