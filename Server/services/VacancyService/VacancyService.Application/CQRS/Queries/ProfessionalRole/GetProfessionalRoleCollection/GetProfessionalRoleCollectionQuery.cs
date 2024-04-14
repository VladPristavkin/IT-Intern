using MediatR;
using VacancyService.Application.DataTransferObjects;

namespace VacancyService.Application.CQRS.Queries.ProfessionalRole.GetProfessionalRoleCollection
{
    public record GetProfessionalRoleCollectionQuery(bool TrackChanges) : IRequest<IEnumerable<ProfessionalRoleDto>>;
}
