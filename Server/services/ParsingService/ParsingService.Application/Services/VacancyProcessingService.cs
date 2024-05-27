using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Application.Models;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Application.Services
{
    public class VacancyProcessingService(ILogger<VacancyProcessingService> logger,
        IServiceProvider serviceProvider,
        IIntegrationEventService integrationEventService,
        IOptions<ParsingOptions> parsingOptions,
        IVacancyRepository vacancyRepository,
        IMetroRepository metroRepository)
        : IVacancyProcessingService
    {
        private readonly ILogger<VacancyProcessingService> _logger = logger;
        private readonly IIntegrationEventService _integrationEventService = integrationEventService;
        private readonly ParsingOptions _parsingOptions = parsingOptions.Value;
        private readonly IVacancyRepository _vacancyRepository = vacancyRepository;
        private readonly IMetroRepository _metroRepository = metroRepository;
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        public async Task ProcessVacanciesAsync(CancellationToken token)
        {
            _logger.LogInformation("VacancyProcessingService is running.");

            await new TaskFactory().StartNew(() => PublishVacancies(token));

            using var scope = _serviceProvider.CreateScope();

            while (!token.IsCancellationRequested)
            {
                try
                {
                    List<Task> tasks = new List<Task>();

                    foreach (var parserType in _parsingOptions.ParserTypes.Values.ToArray())
                    {
                        var parser = scope.ServiceProvider.GetKeyedServices<IParser>(parserType).FirstOrDefault();
                        tasks.Add(parser.Parse());
                    }

                    await Task.WhenAll(tasks);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while processing vacancies.");
                }
            }

            _logger.LogInformation("VacancyProcessingService is stopping.");
        }

        private async Task PublishVacancies(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                if (await _vacancyRepository.GetCount() < 100)
                {
                    await Task.Delay(3000, token);
                }
                else
                {
                    var vacancies = await _vacancyRepository.GetFirstOneHundredVacancies();

                    await _integrationEventService.SaveEventAsync(new VacancyCreatedIntegrationEvent(vacancies));

                    await _vacancyRepository.DeleteVacancies(vacancies.ToArray());

                    await _integrationEventService.PublishEventsThroughEventBusAsync();
                }
            }
        }
    }
}
