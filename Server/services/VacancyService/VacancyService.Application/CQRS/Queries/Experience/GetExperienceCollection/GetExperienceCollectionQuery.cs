using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.Experience.GetExperienceCollection
{
    public record GetExperienceCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<ExperienceDto>>;
}
