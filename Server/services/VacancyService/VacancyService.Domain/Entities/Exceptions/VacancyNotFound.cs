namespace VacancyService.Domain.Entities.Exceptions
{
    public class VacancyNotFound : NotFoundException
    {
        public VacancyNotFound(int VacancyId) : base($"Vacancy with id: {VacancyId} not found in database.") { }
    }
}
