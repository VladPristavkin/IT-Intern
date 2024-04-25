using EventBus.Events;

namespace ParsingService.Application.IntegrationEvents
{
    public interface IIntegrationEventService
    {
        public Task PublishEventsThroughEventBusAsync(IntegrationEvent @event);
        public Task SaveEventAsync(IntegrationEvent @event);
    }
}
