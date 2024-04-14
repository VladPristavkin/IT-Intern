using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Level.GetLevelCollection
{
    internal class GetLevelCollectionHandler
        : IRequestHandler<GetLevelCollectionQuery, IEnumerable<LevelDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetLevelCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<LevelDto>> Handle(GetLevelCollectionQuery request, CancellationToken cancellationToken)
        {
            var levelCollectionEntity = await _repositoryManager.Level
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var levelCollection = _mapper.Map<IEnumerable<LevelDto>>(levelCollectionEntity);

            return levelCollection;
        }
    }
}
