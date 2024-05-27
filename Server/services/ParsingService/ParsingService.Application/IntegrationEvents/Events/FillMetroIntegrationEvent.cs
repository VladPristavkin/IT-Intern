using EventBus.Events;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Application.IntegrationEvents.Events
{
    public record FillMetroIntegrationEvent(IEnumerable<MetroLine> MetroLines) : IntegrationEvent;
}
