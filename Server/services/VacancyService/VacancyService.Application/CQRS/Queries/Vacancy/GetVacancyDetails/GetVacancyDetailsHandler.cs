using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyDetails
{
    internal sealed class GetVacancyDetailsHandler : IRequestHandler<GetVacancyDetailsQuery, VacancyDto>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public GetVacancyDetailsHandler(IRepositoryManager repository, IMapper mapper)
        {
            _repositoryManager = repository;
            _mapper = mapper;
        }

        public async Task<VacancyDto> Handle(GetVacancyDetailsQuery request, CancellationToken cancellationToken)
        {
            var vacancy = await _repositoryManager.Vacancy
                .GetVacancyByIdAsync(request.Id, request.TrackChanges, cancellationToken, request.VacancyParameters) ??
                throw new VacancyNotFoundException(request.Id);

            var vacancyDto = _mapper.Map<VacancyDto>(vacancy);

            if (vacancyDto.Area != null)
            {
                var country = await _repositoryManager.Area.GetCountryByAreaAsync(vacancyDto.Area.Id, cancellationToken);

                vacancyDto.Country = _mapper.Map<AreaForVacancyDto>(country);
            }

            return vacancyDto;
        }
    }
}
