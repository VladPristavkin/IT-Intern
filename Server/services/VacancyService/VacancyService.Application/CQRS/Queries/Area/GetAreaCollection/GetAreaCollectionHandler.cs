using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Area.GetAreaCollection
{
    public class GetAreaCollectionHandler : IRequestHandler<GetAreaCollectionQuery, IEnumerable<AreaDto>>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public GetAreaCollectionHandler(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AreaDto>> Handle(GetAreaCollectionQuery request, CancellationToken cancellationToken)
        {
            var areas = await _repositoryManager.Area.GetAreasAsync(request.TrackChanges, cancellationToken);

            var areasDto = _mapper.Map<IEnumerable<AreaDto>>(areas);

            return areasDto;
        }
    }
}
