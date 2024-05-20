using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Employment.GetEmploymentCollection
{
    public record GetEmploymentCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<EmploymentDto>>;
}
