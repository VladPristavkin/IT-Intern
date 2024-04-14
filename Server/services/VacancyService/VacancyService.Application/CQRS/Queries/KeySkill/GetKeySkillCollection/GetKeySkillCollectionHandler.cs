using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.KeySkill.GetKeySkillCollection
{
    internal class GetKeySkillCollectionHandler
        : IRequestHandler<GetKeySkillCollectionQuery, IEnumerable<KeySkillDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetKeySkillCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<KeySkillDto>> Handle(GetKeySkillCollectionQuery request, CancellationToken cancellationToken)
        {
            var keySkillCollectionEntity = await _repositoryManager.KeySkill
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var keySkillCollection = _mapper.Map<IEnumerable<KeySkillDto>>(keySkillCollectionEntity);

            return keySkillCollection;
        }
    }
}
