using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Language.GetLanguageCollection
{
    internal class GetLanguageCollectionHandler
        : IRequestHandler<GetLanguageCollectionQuery, IEnumerable<LanguageDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetLanguageCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<LanguageDto>> Handle(GetLanguageCollectionQuery request, CancellationToken cancellationToken)
        {
            var languageCollectionEntity = await _repositoryManager.Language
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var languageCollection = _mapper.Map<IEnumerable<LanguageDto>>(languageCollectionEntity);

            return languageCollection;
        }
    }
}
