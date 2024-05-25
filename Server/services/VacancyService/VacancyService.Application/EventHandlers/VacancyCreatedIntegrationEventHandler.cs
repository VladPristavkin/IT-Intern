using AutoMapper;
using EventBus.Interfaces;
using MediatR;
using VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Application.Events;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.EventHandlers
{
    internal sealed class VacancyCreatedIntegrationEventHandler : IIntegrationEventHandler<VacancyCreatedIntegrationEvent>
    {
        private readonly ISender _sender;
        private readonly IMapper _mapper;

        public VacancyCreatedIntegrationEventHandler(ISender sender, IMapper mapper)
        {
            _sender = sender;
            _mapper = mapper;
        }

        public async Task Handle(VacancyCreatedIntegrationEvent @event)
        {
            foreach (var vacancy in @event.Vacancies ?? throw new VacancyNotFoundException("Vacancies not exists."))
            {
                await _sender.Send(new CreateVacancyCommand(_mapper.Map<VacancyForCreationDto>(vacancy)));
            }

        }
    }
}
