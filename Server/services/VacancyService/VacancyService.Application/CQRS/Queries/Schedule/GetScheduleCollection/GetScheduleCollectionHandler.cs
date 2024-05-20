using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Interfaces;

namespace VacancyService.Application.CQRS.Queries.Schedule.GetScheduleCollection
{
    internal class GetScheduleCollectionHandler
        : IRequestHandler<GetScheduleCollectionQuery, IEnumerable<ScheduleDto>>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public GetScheduleCollectionHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<IEnumerable<ScheduleDto>> Handle(GetScheduleCollectionQuery request, CancellationToken cancellationToken)
        {
            var scheduleCollectionEntity = await _repositoryManager.Schedule
                .GetAllAsync(request.TrackChanges, cancellationToken);

            var scheduleCollection = _mapper.Map<IEnumerable<ScheduleDto>>(scheduleCollectionEntity);

            return scheduleCollection;
        }
    }
}
