using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Area.GetAreaCollection
{
    public record GetAreaCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<AreaDto>>;
}
