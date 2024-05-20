using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.ProfessionalRole.GetProfessionalRoleCollection
{
    internal class GetProfessionalRoleCollectionHandler
        : IRequestHandler<GetProfessionalRoleCollectionQuery, IEnumerable<ProfessionalRoleDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetProfessionalRoleCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<ProfessionalRoleDto>> Handle(GetProfessionalRoleCollectionQuery request, CancellationToken cancellationToken)
        {
            var professionalRoleCollectionEntity = await _repositoryManager.ProfessionalRole
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var professionalRoleCollection = _mapper.Map<IEnumerable<ProfessionalRoleDto>>(professionalRoleCollectionEntity);

            return professionalRoleCollection;
        }
    }
}
