using ParsingService.Domain.Entities.Models;

namespace ParsingService.Domain.Abstractions
{
    public interface IVacancyProcessingService
    {
        public Task ProcessVacanciesAsync(CancellationToken token);
    }
}
