using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Experience.GetExperienceCollection
{
    internal class GetExperienceCollectionHandler
        : IRequestHandler<GetExperienceCollectionQuery, IEnumerable<ExperienceDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetExperienceCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<ExperienceDto>> Handle(GetExperienceCollectionQuery request, CancellationToken cancellationToken)
        {
            var experienceCollectionEntity = await _repositoryManager.Experience
                .GetAllExperienceAsync(request.TrackChanges, cancellationToken);

            var experienceCollection = _mapper.Map<IEnumerable<ExperienceDto>>(experienceCollectionEntity);

            return experienceCollection;
        }
    }
}
