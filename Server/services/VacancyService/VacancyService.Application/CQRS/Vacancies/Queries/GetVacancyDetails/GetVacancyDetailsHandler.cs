using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Vacancies.Queries.GetVacancyDetails
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
                .GetVacancyByIdAsync(request.VacancyParameters, request.Id, request.TrackChanges, cancellationToken) ??
                throw new VacancyNotFoundException(request.Id);

            var vacancyDto = _mapper.Map<VacancyDto>(vacancy);

            return vacancyDto;
        }
    }
}
