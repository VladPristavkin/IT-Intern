using EventBus.Interfaces;
using ParsingService.Application.IntegrationEvents.Events;

namespace ParsingService.Application.IntegrationEvents.EventHandlers
{
    internal class ParsingConfigurationLoadedIntegrationEventHandler
        : IIntegrationEventHandler<ParsingConfigurationLoadedIntegrationEvent>
    {
        public Task Handle(ParsingConfigurationLoadedIntegrationEvent @event)
        {
            throw new NotImplementedException();
        }
    }
}
