using VacancyService.Domain.Entities.Models;

namespace VacancyService.Domain.Interfaces.RepositoryInterfaces
{
    public interface IProfessionalRoleRepository
    {
        public void CreateProfessionalRole(ProfessionalRole professionalRole);
        public void UpdateProfessionalRole(ProfessionalRole professionalRole);
        public void DeleteProfessionalRole(ProfessionalRole professionalRole);
        public IEnumerable<ProfessionalRole> GetAll(bool trackChanges);
        public Task<IEnumerable<ProfessionalRole>> GetAllAsync(bool trackChanges, CancellationToken token = default);
        public ProfessionalRole? GetProfessionalRoleById(long id, bool trackChanges);
        public Task<ProfessionalRole?> GetProfessionalRoleByIdAsync(long id, bool trackChanges, CancellationToken token = default);
    }
}
