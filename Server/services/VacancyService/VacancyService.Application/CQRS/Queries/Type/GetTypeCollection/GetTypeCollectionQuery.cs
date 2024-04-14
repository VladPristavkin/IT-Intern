using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Type.GetTypeCollection
{
    public record GetTypeCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<TypeDto>>;
}
