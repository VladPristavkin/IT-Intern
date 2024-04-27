using EventBus.Events;

namespace ParsingService.Application.IntegrationEvents
{
    public interface IIntegrationEventService
    {
        public Task PublishEventsThroughEventBusAsync();
        public Task SaveEventAsync(IntegrationEvent @event);
    }
}
