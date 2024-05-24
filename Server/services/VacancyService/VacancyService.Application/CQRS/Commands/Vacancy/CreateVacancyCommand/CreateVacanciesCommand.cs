using MediatR;
using VacancyEntity = VacancyService.Domain.Entities.Models.Vacancy;

namespace VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand
{
    public record CreateVacanciesCommand(IEnumerable<VacancyEntity> Vacancies) : IRequest<Unit>;
}
