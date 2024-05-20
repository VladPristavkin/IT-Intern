namespace VacancyService.Domain.Entities.Exceptions
{
    public class LanguageNotFoundException : NotFoundException
    {
        public LanguageNotFoundException(string Id) : base($"Language with id {Id} not found in database.") { }
    }
}
