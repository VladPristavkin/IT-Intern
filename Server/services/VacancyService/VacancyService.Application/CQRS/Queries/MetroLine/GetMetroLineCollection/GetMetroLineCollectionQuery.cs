using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.MetroLine.GetMetroLineCollection
{
    public record GetMetroLineCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<MetroLineDto>>;
}
