using EventBus.Events;
using VacancyService.Domain.Entities.Models;

namespace VacancyService.Application.Events
{
    public record FillMetroIntegrationEvent(IEnumerable<MetroLine> MetroLines) : IntegrationEvent;
}
