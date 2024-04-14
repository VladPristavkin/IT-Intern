namespace VacancyService.Domain.Entities.Exceptions
{
    public class AreaNotFoundException : NotFoundException
    {
        public AreaNotFoundException(long AreaId) : base($"Area with id: {AreaId} not found in database.") { }
    }
}
