using EventBus.Events;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Application.Events
{
    public record VacancyCreatedIntegrationEvent(IEnumerable<Vacancy>? Vacancies) : IntegrationEvent;
}
