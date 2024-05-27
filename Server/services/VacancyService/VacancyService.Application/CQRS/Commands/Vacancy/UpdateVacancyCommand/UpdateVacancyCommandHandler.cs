using AutoMapper;
using MediatR;
using VacancyService.Application.Common.Helpers;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces;
using VacancyEntity = VacancyService.Domain.Entities.Models.Vacancy;

namespace VacancyService.Application.CQRS.Commands.Vacancy.UpdateVacancyCommand
{
    internal sealed class UpdateVacancyCommandHandler
        : IRequestHandler<UpdateVacancyCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public UpdateVacancyCommandHandler(IMapper mapper, IRepositoryManager repositoryManager)
        {
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public async Task<Unit> Handle(UpdateVacancyCommand request, CancellationToken cancellationToken)
        {
            var vacancyEntity = await _repositoryManager.Vacancy
                .GetVacancyByIdAsync(request.Id, request.TrackChanges, cancellationToken)
                ?? throw new VacancyNotFoundException(request.Id);

            await HandleAddressAsync(vacancyEntity, request.VacancyForUpdate, cancellationToken);

            _mapper.Map(request.VacancyForUpdate, vacancyEntity);

            await _repositoryManager.SaveAsync();

            return Unit.Value;
        }

        private async Task<VacancyEntity> HandleAddressAsync(VacancyEntity vacancy,
            VacancyForUpdateDto vacancyForUpdate,
            CancellationToken cancellationToken = default)
        {
            if (vacancy.Address == null || vacancyForUpdate.Address == null) return vacancy;

            if (!vacancy.Address.Lng.Equals(vacancyForUpdate.Address.Lng) ||
               !vacancy.Address.Lat.Equals(vacancyForUpdate.Address.Lat))
            {
                var metroStations = await _repositoryManager.MetroStation.GetAllAsync(false, cancellationToken);

                List<MetroStation> MetroStations = new();

                if (vacancy.Address.MetroStations != null)
                    MetroStations = vacancy.Address.MetroStations.ToList();

                vacancy.Address.MetroStations = new List<MetroStation>();

                foreach (var metroStation in metroStations)
                {
#pragma warning disable CS8604
                    ((List<MetroStation>)vacancy.Address.MetroStations).Add(await _repositoryManager.MetroStation
                        .GetMetroStationByIdAsync(metroStation.Id, trackChanges: true, cancellationToken));
#pragma warning restore CS8604
                }

                ((List<MetroStation>)vacancy.Address.MetroStations).AddRange(MetroStations);
            }

            return vacancy;
        }
    }
}
