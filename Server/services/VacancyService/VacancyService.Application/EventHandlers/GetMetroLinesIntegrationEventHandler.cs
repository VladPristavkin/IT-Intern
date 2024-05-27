using EventBus.Interfaces;
using ParsingService.Application.Services;
using VacancyService.Application.Events;
using VacancyService.Domain.Entities.Models;
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
            var metroLines = await _repositoryManager.MetroLine.GetAllAsync(false) as List<MetroLine>;

            for (int i = 0; i < metroLines.Count; i++)
            {
                var metroStations = metroLines[i].Stations.ToList();

                var newStationsList = new List<MetroStation>();

                for (int j = 0; j < metroStations.Count; j++)
                {
                    var station = await _repositoryManager.MetroStation.GetMetroStationByIdAsync(metroStations[j].Id, false);
                    newStationsList.Add(station);
                }

                metroLines[i].Stations = newStationsList;
            }

            await _integrationEventService.SaveEventAsync(new FillMetroIntegrationEvent(metroLines));

            await _integrationEventService.PublishEventsThroughEventBusAsync();
        }
    }
}
