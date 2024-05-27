using EventBus.Events;

namespace ParsingService.Application.Services
{
    public interface IIntegrationEventService
    {
        public Task PublishEventsThroughEventBusAsync();
        public Task SaveEventAsync(IntegrationEvent @event);
    }
}
