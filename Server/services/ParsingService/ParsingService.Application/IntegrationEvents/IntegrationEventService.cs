using EventBus.Events;
using EventBus.IntegrationEventLog.Services;
using EventBus.Interfaces;
using Microsoft.Extensions.Logging;

namespace ParsingService.Application.IntegrationEvents
{
    public class IntegrationEventService(IEventBus eventBus,
        ILogger<IntegrationEventService> logger,
        IIntegrationEventLogService integrationEventLog) : IIntegrationEventService
    {
        private readonly IEventBus _eventBus = eventBus;
        private readonly ILogger<IntegrationEventService> _logger = logger;
        private readonly IIntegrationEventLogService _integrationEventLog = integrationEventLog;

        public async Task PublishEventsThroughEventBusAsync()
        {
            var pendingEvents = _integrationEventLog.RetrieveEventLogsPendingToPublishAsync().Result;

            foreach (var pendingEvent in pendingEvents)
            {
                _logger.LogInformation("Publishing integration event: {IntegrationEventId} - ({@IntegrationEvent})",
                    pendingEvent.EventId, pendingEvent.IntegrationEvent);

                try
                {
                    await _integrationEventLog.MarkEventAsInProgressAsync(pendingEvent.EventId);
                    await _eventBus.PublishAsync(pendingEvent.IntegrationEvent);
                    await _integrationEventLog.MarkEventAsPublishedAsync(pendingEvent.EventId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error publishing integration event: {IntegrationEventId}", pendingEvent.EventId);
                    await _integrationEventLog.MarkEventAsFailedAsync(pendingEvent.EventId);
                }
            }
        }

        public async Task SaveEventAsync(IntegrationEvent @event)
        {
            _logger.LogInformation("Enqueuing integration event {IntegrationEventId} to repository ({@IntegrationEvent})", @event.Id, @event);

            await _integrationEventLog.SaveEventAsync(@event);
        }
    }
}
