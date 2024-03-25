using MediatR;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;

namespace VacancyService.Application.Vacancies.Commands.CreateVacancyCommand
{
    public sealed record CreateVacancyCommand(VacancyForCreationDto Vacancy) : IRequest<VacancyDto>;
}
