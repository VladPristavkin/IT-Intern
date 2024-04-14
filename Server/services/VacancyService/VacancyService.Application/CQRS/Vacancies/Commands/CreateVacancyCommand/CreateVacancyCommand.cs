using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Vacancies.Commands.CreateVacancyCommand
{
    public sealed record CreateVacancyCommand(VacancyForCreationDto Vacancy) : IRequest<VacancyDto>;
}
