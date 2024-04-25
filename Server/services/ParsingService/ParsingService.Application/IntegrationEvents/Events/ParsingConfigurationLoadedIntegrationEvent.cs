using EventBus.Events;

namespace ParsingService.Application.IntegrationEvents.Events
{
    public record ParsingConfigurationLoadedIntegrationEvent : IntegrationEvent
    {
        public IEnumerable<string>? Settings { get; set; }
    }
}
