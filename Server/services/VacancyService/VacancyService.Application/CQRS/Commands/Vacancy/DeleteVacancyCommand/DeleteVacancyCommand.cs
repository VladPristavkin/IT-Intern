using MediatR;

namespace VacancyService.Application.CQRS.Commands.Vacancy.DeleteVacancyCommand
{
    public record DeleteVacancyCommand(long Id, bool TrackChanges) : IRequest<Unit>;
}
