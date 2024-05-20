using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Type.GetTypeCollection
{
    internal class GetTypeCollectionHandler
        : IRequestHandler<GetTypeCollectionQuery, IEnumerable<TypeDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetTypeCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<TypeDto>> Handle(GetTypeCollectionQuery request, CancellationToken cancellationToken)
        {
            var typeCollectionEntity = await _repositoryManager.Type
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var typeCollection = _mapper.Map<IEnumerable<TypeDto>>(typeCollectionEntity);

            return typeCollection;
        }
    }
}
