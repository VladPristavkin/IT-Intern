using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.MetroLine.GetMetroLineCollection
{
    internal class GetMetroLineCollectionHandler
        : IRequestHandler<GetMetroLineCollectionQuery, IEnumerable<MetroLineDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetMetroLineCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<MetroLineDto>> Handle(GetMetroLineCollectionQuery request, CancellationToken cancellationToken)
        {
            var metroLineColletionEntity = await _repositoryManager.MetroLine
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var metroLineCollection = _mapper.Map<IEnumerable<MetroLineDto>>(metroLineColletionEntity);

            return metroLineCollection;
        }
    }
}
