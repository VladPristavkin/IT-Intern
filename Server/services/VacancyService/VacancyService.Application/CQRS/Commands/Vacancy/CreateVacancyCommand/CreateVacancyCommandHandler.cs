using AutoMapper;
using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Interfaces;
using VacancyEntity = VacancyService.Domain.Entities.Models.Vacancy;

namespace VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand
{
    internal sealed class CreateVacancyCommandHandler : IRequestHandler<CreateVacancyCommand, VacancyDto>
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CreateVacancyCommandHandler(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<VacancyDto> Handle(CreateVacancyCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<VacancyEntity>(request.Vacancy);

            if (entity.Area != null)
                entity.Area = await _repositoryManager.Area.GetAreaByIdAsync(entity.Area.Id, true, cancellationToken);

            if (entity.Employment != null)
                entity.Employment = await _repositoryManager.Employment.GetByIdAsync(entity.Employment.Id, true, cancellationToken);

            if (entity.Experience != null)
                entity.Experience = await _repositoryManager.Experience.GetExperienceByIdAsync(entity.Experience.Id, true, cancellationToken);

            if (entity.Type != null)
                entity.Type = await _repositoryManager.Type.GetTypeByIdAsync(entity.Type.Id, true, cancellationToken);

            if (entity.Schedule != null)
                entity.Schedule = await _repositoryManager.Schedule.GetScheduleByIdAsync(entity.Schedule.Id, true, cancellationToken);

            if (entity.Employer != null)
            {
                _repositoryManager.Employer.CreateEmployer(entity.Employer);
            }

            await HandleKeySkillsAsync(entity, cancellationToken);
            await HandleAddressAsync(entity, cancellationToken);
            await HandleProfessionalRoleAsync(entity, cancellationToken);
            await HandleLanguagesAsync(entity, cancellationToken);

            _repositoryManager.Vacancy.CreateVacancy(entity);

            await _repositoryManager.SaveAsync();

            var vacancyToReturn = _mapper.Map<VacancyDto>(entity);

            if (vacancyToReturn.Area != null)
            {
                var country = await _repositoryManager.Area.GetCountryByAreaAsync(vacancyToReturn.Area.Id, cancellationToken);

                vacancyToReturn.Country = _mapper.Map<AreaForVacancyDto>(country);
            }

            return vacancyToReturn;
        }

        private async Task<VacancyEntity> HandleKeySkillsAsync(VacancyEntity vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.KeySkills != null)
            {
                var KeySkills = (List<KeySkill>)vacancy.KeySkills;

                for (int i = 0; i < KeySkills.Count; i++)
                {
                    var entitySkill = await _repositoryManager.KeySkill.GetSkillByIdAsync(KeySkills[i].Name, false, cancellationToken);

                    if (entitySkill == null) continue;

#pragma warning disable CS8601
                    KeySkills[i] = _repositoryManager.KeySkill
                        .GetSkillByIdAsync(KeySkills[i].Name, true, cancellationToken).Result;
#pragma warning restore CS8601 
                }
            }

            return vacancy;
        }

        private async Task<VacancyEntity> HandleProfessionalRoleAsync(VacancyEntity vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.ProfessionalRoles != null)
            {
                var ProfessionalRoles = (List<ProfessionalRole>)vacancy.ProfessionalRoles;

                for (int i = 0; i < ProfessionalRoles.Count; i++)
                {
                    ProfessionalRoles[i] = await _repositoryManager.ProfessionalRole
                           .GetProfessionalRoleByIdAsync(ProfessionalRoles[i].Id, true, cancellationToken)
                            ?? throw new ProfessionalRoleNotFoundException(ProfessionalRoles[i].Id);
                }
            }

            return vacancy;
        }

        private async Task<VacancyEntity> HandleLanguagesAsync(VacancyEntity vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.Languages != null)
            {
                var Languages = (List<Language>)vacancy.Languages;

                for (int i = 0; i < Languages.Count; i++)
                {
                    var Levels = (List<Level>)Languages[i].Levels;


                    for (int j = 0; j < Levels.Count; j++)
                    {
                        Languages[i] = await _repositoryManager.Language
                            .GetLanguageByWithLevelIdAsync(Languages[i].Id, Levels[j].Id, true, cancellationToken)
                            ?? throw new LanguageNotFoundException(Languages[i].Id);
                    }
                }
            }
                
            return vacancy;
        }

        private async Task<VacancyEntity> HandleAddressAsync(VacancyEntity vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.Address != null)
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
