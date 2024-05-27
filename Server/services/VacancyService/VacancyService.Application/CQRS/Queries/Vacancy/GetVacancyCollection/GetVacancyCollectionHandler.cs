using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyCollection
{
    internal sealed class GetVacancyCollectionHandler :
        IRequestHandler<GetVacancyCollectionQuery, SearchResultInfo<VacancyDto>>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public GetVacancyCollectionHandler(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<SearchResultInfo<VacancyDto>> Handle(GetVacancyCollectionQuery request, CancellationToken cancellationToken)
        {
            var vacancies = await _repositoryManager.Vacancy
                .GetAllAsync(request.TrackChanges, cancellationToken, request.VacancyParameters);

            var vacanciesDto = _mapper.Map<IEnumerable<VacancyDto>>(vacancies);

            var vac = (List<VacancyDto>)vacanciesDto;

            for (int i = 0; i < vac.Count; i++)
            {
                if (vac[i].Area != null)
                {
                    var country = await _repositoryManager.Area.GetCountryByAreaAsync(vac[i].Area.Id, cancellationToken);

                    vac[i].Country = _mapper.Map<AreaForVacancyDto>(country);
                }
            }

            var count = await _repositoryManager.Vacancy.CountAsync(cancellationToken, request.VacancyParameters);

            var resultInfo = new SearchResultInfo<VacancyDto>()
            {
                Items = vacanciesDto,
                Page = request.VacancyParameters.Page,
                PageSize = request.VacancyParameters.PageSize,
                Count = count,
                Pages = (int)Math.Ceiling(count / (double)request.VacancyParameters.PageSize)
            };

            return resultInfo;
        }
    }
}
