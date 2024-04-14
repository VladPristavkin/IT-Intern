using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Employment.GetEmploymentCollection
{
    internal class GetEmploymentCollectionHandler : IRequestHandler<GetEmploymentCollectionQuery, IEnumerable<EmploymentDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetEmploymentCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<EmploymentDto>> Handle(GetEmploymentCollectionQuery request, CancellationToken cancellationToken)
        {
            var employmentCollectionEntity = await _repositoryManager.Employment
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var employmentCollection = _mapper.Map<IEnumerable<EmploymentDto>>(employmentCollectionEntity);

            return employmentCollection;
        }
    }
}
