using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Language.GetLanguageCollection
{
    public record GetLanguageCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<LanguageDto>>;
}
