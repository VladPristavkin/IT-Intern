using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand
{
    public sealed record CreateVacancyCommand(VacancyForCreationDto Vacancy) : IRequest<VacancyDto>;
}
