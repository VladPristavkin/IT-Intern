using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.Vacancies.Queries.GetVacancyCollection
{
    internal sealed class GetVacancyCollectionHandler :
        IRequestHandler<GetVacancyCollectionQuery, IEnumerable<VacancyDto>>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public GetVacancyCollectionHandler(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VacancyDto>> Handle(GetVacancyCollectionQuery request, CancellationToken cancellationToken)
        {
            var vacancies = await _repositoryManager.Vacancy.GetAllAsync(request.TrackChanges, cancellationToken);

            var vacanciesDto = _mapper.Map<IEnumerable<VacancyDto>>(vacancies);

            return vacanciesDto;
        }
    }
}
