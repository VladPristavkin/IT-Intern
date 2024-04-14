namespace VacancyService.Domain.Entities.Exceptions
{
    public class ProfessionalRoleNotFoundException : NotFoundException
    {
        public ProfessionalRoleNotFoundException(long Id) : base($"Professional role with {Id} not found in database.") { }
    }
}
