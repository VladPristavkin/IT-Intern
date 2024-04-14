using Microsoft.EntityFrameworkCore;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces.RepositoryInterfaces;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.Infrastructure.VacancyModelsRepositories
{
    internal class ProfessionalRoleRepository : RepositoryBase<ProfessionalRole>, IProfessionalRoleRepository
    {
        public ProfessionalRoleRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public void CreateProfessionalRole(ProfessionalRole professionalRole) => Create(professionalRole);

        public void DeleteProfessionalRole(ProfessionalRole professionalRole) => Delete(professionalRole);

        public IEnumerable<ProfessionalRole> GetAll(bool trackChanges) =>
            FindAll(trackChanges)
            .Include(p=>p.Parent)
            .ThenInclude(p=>p.Roles)
            .ThenInclude(p=>p.Roles)
            .ToList();

        public async Task<IEnumerable<ProfessionalRole>> GetAllAsync(bool trackChanges, CancellationToken token = default) =>
            await FindAll(trackChanges)
            .Include(p => p.Parent)
            .ThenInclude(p => p.Roles)
            .ThenInclude(p => p.Roles)
            .ToListAsync(token);

        public ProfessionalRole? GetProfessionalRoleById(long id, bool trackChanges) =>
            FindByExpression(p => p.Id.Equals(id), trackChanges)
            .Include(p => p.Parent)
            .ThenInclude(p => p.Roles)
            .ThenInclude(p => p.Roles)
            .SingleOrDefault();

        public async Task<ProfessionalRole?> GetProfessionalRoleByIdAsync(long id, bool trackChanges, CancellationToken token = default) =>
            await FindByExpression(p => p.Id.Equals(id), trackChanges)
            .Include(p => p.Parent)
            .ThenInclude(p => p.Roles)
            .ThenInclude(p => p.Roles)
            .SingleOrDefaultAsync(token);

        public void UpdateProfessionalRole(ProfessionalRole professionalRole) => Update(professionalRole);
    }
}