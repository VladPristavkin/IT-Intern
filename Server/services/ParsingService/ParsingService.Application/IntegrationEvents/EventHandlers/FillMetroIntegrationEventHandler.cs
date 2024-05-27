using EventBus.Interfaces;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Application.IntegrationEvents.EventHandlers
{
    internal sealed class FillMetroIntegrationEventHandler(IMetroRepository metroRepository) :
        IIntegrationEventHandler<FillMetroIntegrationEvent>
    {
        public readonly IMetroRepository _metroRepository = metroRepository;

        public async Task Handle(FillMetroIntegrationEvent @event)
        {
            try
            {
                await _metroRepository.AddMetro(@event.MetroLines);
            }
            catch
            {
                throw;
            }
        }
    }
}
