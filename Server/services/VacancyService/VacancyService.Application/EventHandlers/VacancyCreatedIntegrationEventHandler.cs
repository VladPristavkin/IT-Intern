using EventBus.Interfaces;
using VacancyService.Application.Events;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.EventHandlers
{
    internal sealed class VacancyCreatedIntegrationEventHandler : IIntegrationEventHandler<VacancyCreatedIntegrationEvent>
    {
        private readonly IRepositoryManager _repositoryManager;

        public VacancyCreatedIntegrationEventHandler(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
        }

        public async Task Handle(VacancyCreatedIntegrationEvent @event)
        {
            foreach (var vacancy in @event.Vacancies)
            {
                _repositoryManager.Vacancy.CreateVacancy(vacancy);
            }

            await _repositoryManager.SaveAsync();
        }
    }
}
