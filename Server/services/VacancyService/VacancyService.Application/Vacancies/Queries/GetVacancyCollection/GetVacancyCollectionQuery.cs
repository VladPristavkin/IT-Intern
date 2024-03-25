using MediatR;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;

namespace VacancyService.Application.Vacancies.Queries.GetVacancyCollection
{
    public sealed record GetVacancyCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<VacancyDto>>;
}
