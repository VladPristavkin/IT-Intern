using EventBus.Interfaces;
using ParsingService.Application.Services;
using VacancyService.Application.Events;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.EventHandlers
{
    internal sealed class GetMetroLinesIntegrationEventHandler(IRepositoryManager repositoryManager,
        IIntegrationEventService integrationEventService) :
        IIntegrationEventHandler<GetMetroLinesIntegrationEvent>
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IIntegrationEventService _integrationEventService = integrationEventService;

        public async Task Handle(GetMetroLinesIntegrationEvent @event)
        {
            var metroLines = await _repositoryManager.MetroLine.GetAllAsync(false);

            await _integrationEventService.SaveEventAsync(new FillMetroIntegrationEvent(metroLines));

            await _integrationEventService.PublishEventsThroughEventBusAsync();
        }
    }
}
