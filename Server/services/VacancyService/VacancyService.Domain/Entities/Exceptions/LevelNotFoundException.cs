namespace VacancyService.Domain.Entities.Exceptions
{
    public class LevelNotFoundException : NotFoundException
    {
        public LevelNotFoundException(string Id) : base($"Level with id {Id} not found in database.") { }
    }
}
