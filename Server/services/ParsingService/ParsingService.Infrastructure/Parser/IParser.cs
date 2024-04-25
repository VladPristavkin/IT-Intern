using VacancyService.Domain.Entities.Models;

namespace JobSearchAssistant.BL.Parser
{
    public interface IParser
    {
        public IEnumerable<Vacancy> Parse();
    }
}
