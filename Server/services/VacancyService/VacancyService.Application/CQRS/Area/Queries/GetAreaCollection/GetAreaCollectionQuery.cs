using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Area.Queries.GetAreaCollection
{
    public record GetAreaCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<AreaDto>>;
}
