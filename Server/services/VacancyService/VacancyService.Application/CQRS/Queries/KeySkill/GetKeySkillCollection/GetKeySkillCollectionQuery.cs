using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.KeySkill.GetKeySkillCollection
{
    public record GetKeySkillCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<KeySkillDto>>;
}
