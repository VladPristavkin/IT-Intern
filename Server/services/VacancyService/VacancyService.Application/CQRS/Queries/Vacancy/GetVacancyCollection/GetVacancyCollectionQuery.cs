using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyCollection
{
    public sealed record GetVacancyCollectionQuery(VacancyParameters VacancyParameters, bool TrackChanges) : IRequest<SearchResultInfo<VacancyDto>>;
}
