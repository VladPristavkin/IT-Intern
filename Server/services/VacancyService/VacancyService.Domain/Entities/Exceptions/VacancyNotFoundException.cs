namespace VacancyService.Domain.Entities.Exceptions
{
    public class VacancyNotFoundException : NotFoundException
    {
        public VacancyNotFoundException(long VacancyId) : base($"Vacancy with id: {VacancyId} not found in database.") { }
    }
}
