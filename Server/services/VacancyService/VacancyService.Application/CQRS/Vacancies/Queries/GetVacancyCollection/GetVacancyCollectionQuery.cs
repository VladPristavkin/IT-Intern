using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Application.CQRS.Vacancies.Queries.GetVacancyCollection
{
    public sealed record GetVacancyCollectionQuery(VacancyParameters VacancyParameters, bool TrackChanges) : IRequest<SearchResultInfo<VacancyDto>>;
}
