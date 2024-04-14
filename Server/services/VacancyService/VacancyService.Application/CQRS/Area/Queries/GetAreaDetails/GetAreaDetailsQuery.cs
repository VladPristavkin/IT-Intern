using MediatR;
using VacancyService.Application.DataTransferObjects;  

namespace VacancyService.Application.CQRS.Area.Queries.GetAreaDetails
{
    public record GetAreaDetailsQuery(long Id, bool TrackChanges) : IRequest<AreaDto>;
}
