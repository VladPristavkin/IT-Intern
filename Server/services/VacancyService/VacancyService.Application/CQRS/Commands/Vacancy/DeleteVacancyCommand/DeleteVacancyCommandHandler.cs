using AutoMapper;
using MediatR;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Commands.Vacancy.DeleteVacancyCommand
{
    internal sealed class DeleteVacancyCommandHandler
        : IRequestHandler<DeleteVacancyCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public DeleteVacancyCommandHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<Unit> Handle(DeleteVacancyCommand request, CancellationToken cancellationToken)
        {
            var vacancy = await _repositoryManager.Vacancy
                .GetVacancyByIdAsync(request.Id, request.TrackChanges, cancellationToken)
                ?? throw new VacancyNotFoundException(request.Id);

            _repositoryManager.Vacancy.DeleveVacancy(vacancy);
            await _repositoryManager.SaveAsync();

            return Unit.Value;
        }
    }
}
