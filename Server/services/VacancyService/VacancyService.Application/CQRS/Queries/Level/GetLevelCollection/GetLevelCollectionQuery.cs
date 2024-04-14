using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Level.GetLevelCollection
{
    public record GetLevelCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<LevelDto>>;
}
