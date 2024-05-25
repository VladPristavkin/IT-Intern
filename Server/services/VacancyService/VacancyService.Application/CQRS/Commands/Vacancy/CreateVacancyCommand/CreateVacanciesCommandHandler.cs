using AutoMapper;
using MediatR;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand
{
    internal sealed class CreateVacanciesCommandHandler : IRequestHandler<CreateVacanciesCommand, Unit>
    {
        private readonly ISender _sender;

        public CreateVacanciesCommandHandler(ISender sender)
        {
            _sender = sender;
        }

        public Task<Unit> Handle(CreateVacanciesCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
