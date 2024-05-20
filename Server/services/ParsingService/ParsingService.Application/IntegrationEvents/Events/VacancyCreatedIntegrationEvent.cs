using EventBus.Events;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Application.IntegrationEvents.Events
{
    public record VacancyCreatedIntegrationEvent : IntegrationEvent
    {
        public IEnumerable<Vacancy>? Vacancies { get; set; }

        public VacancyCreatedIntegrationEvent(IEnumerable<Vacancy> vacancies) => Vacancies = vacancies;
    }
}
