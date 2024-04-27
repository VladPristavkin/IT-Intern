using EventBus.Interfaces;
using ParsingService.Application.IntegrationEvents.Events;

namespace ParsingService.Application.IntegrationEvents.EventHandlers
{
    public sealed class ParsingConfigurationLoadedIntegrationEventHandler
        : IIntegrationEventHandler<ParsingConfigurationLoadedIntegrationEvent>
    {
        public Task Handle(ParsingConfigurationLoadedIntegrationEvent @event)
        {
            throw new NotImplementedException();
        }
    }
}
