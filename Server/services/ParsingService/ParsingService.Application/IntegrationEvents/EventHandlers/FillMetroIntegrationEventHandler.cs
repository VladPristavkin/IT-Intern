using EventBus.Interfaces;
using Microsoft.Extensions.Logging;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Application.IntegrationEvents.EventHandlers
{
    internal sealed class FillMetroIntegrationEventHandler(ILogger logger,
        IMetroRepository metroRepository) :
        IIntegrationEventHandler<FillMetroIntegrationEvent>
    {
        private readonly ILogger _logger = logger;
        public readonly IMetroRepository _metroRepository = metroRepository;

        public async Task Handle(FillMetroIntegrationEvent @event)
        {
            try
            {
                await _metroRepository.AddMetro(@event.MetroLines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing FillMetroIntegrationEvent.");
                throw;
            }
        }
    }
}
