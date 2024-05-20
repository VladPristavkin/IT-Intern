using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Schedule.GetScheduleCollection
{
    public record GetScheduleCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<ScheduleDto>>;
}
