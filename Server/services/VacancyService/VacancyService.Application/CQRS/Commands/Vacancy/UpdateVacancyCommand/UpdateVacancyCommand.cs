using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Commands.Vacancy.UpdateVacancyCommand
{
    public record UpdateVacancyCommand(long Id, VacancyForUpdateDto VacancyForUpdate, bool TrackChanges)
        : IRequest<Unit>;
}
