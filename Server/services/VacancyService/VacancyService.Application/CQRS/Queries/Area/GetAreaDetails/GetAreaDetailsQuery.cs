using MediatR;
using VacancyService.Application.DataTransferObjects;  

namespace VacancyService.Application.CQRS.Queries.Area.GetAreaDetails
{
    public record GetAreaDetailsQuery(long Id, bool TrackChanges) : IRequest<AreaDto>;
}
