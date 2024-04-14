using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Area.GetAreaDetails
{
    public class GetAreaDetailsHandler : IRequestHandler<GetAreaDetailsQuery, AreaDto>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public GetAreaDetailsHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<AreaDto> Handle(GetAreaDetailsQuery request, CancellationToken cancellationToken)
        {
            var area = await _repositoryManager.Area
                .GetAreaByIdAsync(request.Id, request.TrackChanges, cancellationToken) ??
                throw new AreaNotFoundException(request.Id);

            var areaDto = _mapper.Map<AreaDto>(area);

            return areaDto;
        }
    }
}
