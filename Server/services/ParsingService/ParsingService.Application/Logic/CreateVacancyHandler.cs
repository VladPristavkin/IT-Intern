using Microsoft.EntityFrameworkCore;
using ParsingService.Application.Common.Helpers;
using ParsingService.Domain.Abstractions;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Application.Logic
{
    public sealed class CreateVacancyHandler
    {
        private readonly IVacancyRepository _vacancyRepository;
        private readonly DbContext _dbContext;

#pragma warning disable CS8620

        public CreateVacancyHandler(IVacancyRepository vacancyRepository, DbContext dbContext)
        {
            _vacancyRepository = vacancyRepository;
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(Vacancy vacancy, CancellationToken cancellationToken)
        {
            if (vacancy.Area != null)
                vacancy.Area = await _dbContext.Set<Area>()
            .Where(a => a.Id.Equals(vacancy.Area.Id))
            .Include(a => a.Parent)
            .ThenInclude(a => a.Parent)
            .ThenInclude(a => a.Parent)
            .ThenInclude(a => a.Parent)
            .Include(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .ThenInclude(a => a.Areas)
            .SingleOrDefaultAsync(cancellationToken);

            if (vacancy.Employment != null)
                vacancy.Employment = await _dbContext.Set<Employment>()
                    .Where(e => e.Id.Equals(vacancy.Employment.Id))
                      .SingleOrDefaultAsync(cancellationToken);

            if (vacancy.Experience != null)
                vacancy.Experience = await _dbContext.Set<Experience>()
                    .Where(e => e.Id.Equals(vacancy.Experience.Id))
                    .SingleOrDefaultAsync(cancellationToken);

            if (vacancy.Type != null)
                vacancy.Type = await _dbContext.Set<ParsingService.Domain.Entities.Models.Type>()
                    .Where(t => t.Id == vacancy.Type.Id)
                    .SingleOrDefaultAsync(cancellationToken);

            if (vacancy.Schedule != null)
                vacancy.Schedule = await _dbContext.Set<Schedule>()
                    .Where(s => s.Id.Equals(vacancy.Schedule.Id))
                    .SingleOrDefaultAsync(cancellationToken);

            if (vacancy.Employer != null)
            {
                _dbContext.Set<Employer>().Add(vacancy.Employer);
            }

            await HandleKeySkillsAsync(vacancy, cancellationToken);
            await HandleAddressAsync(vacancy, cancellationToken);
            await HandleProfessionalRoleAsync(vacancy, cancellationToken);
            await HandleLanguagesAsync(vacancy, cancellationToken);

            await _vacancyRepository.CreateVacancyAsync(vacancy);

            return true;
        }

        private async Task<Vacancy> HandleKeySkillsAsync(Vacancy vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.KeySkills != null)
            {
                var KeySkills = (List<KeySkill>)vacancy.KeySkills;

                for (int i = 0; i < KeySkills.Count; i++)
                {
                    var entitySkill = await _dbContext.Set<KeySkill>()
                        .AsNoTracking()
                        .Where(k => k.Name == KeySkills[i].Name)
                        .Include(k => k.Vacancies)
                        .SingleOrDefaultAsync(cancellationToken);

                    if (entitySkill == null) continue;

#pragma warning disable CS8601
                    KeySkills[i] = await _dbContext.Set<KeySkill>()
                        .Where(k => k.Name == KeySkills[i].Name)
                        .Include(k => k.Vacancies)
                        .SingleOrDefaultAsync(cancellationToken);
#pragma warning restore CS8601 
                }
            }

            return vacancy;
        }

        private async Task<Vacancy> HandleProfessionalRoleAsync(Vacancy vacancy, CancellationToken cancellationToken = default)
        {
            if (vacancy.ProfessionalRoles != null)
            {
                var ProfessionalRoles = (List<ProfessionalRole>)vacancy.ProfessionalRoles;

                for (int i = 0; i < ProfessionalRoles.Count; i++)
                {
                    ProfessionalRoles[i] = await _dbContext.Set<ProfessionalRole>()
                        .Where(p => p.Id == ProfessionalRoles[i].Id)
                        .Include(p => p.Parent)
                        .Include(p => p.Roles)
                        .ThenInclude(p => p.Roles)
                        .SingleOrDefaultAsync(cancellationToken);
                }
            }

            return vacancy;
        }

        private async Task<Vacancy> HandleLanguagesAsync(Vacancy vacancy, CancellationToken cancellationToken = default)
        {
            vacancy.Languages = null;

            if (vacancy.Languages != null)
            {
                var Languages = (List<Language>)vacancy.Languages;

                for (int i = 0; i < Languages.Count; i++)
                {
                    Languages[i].Levels = new List<Level>();

                    ((List<Level>)Languages[i].Levels).Add(Languages[i].Level);

                    var Levels = (List<Level>)Languages[i].Levels;

                    for (int j = 0; j < Levels.Count; j++)
                    {
                        Languages[i] = await _dbContext.Set<Language>()
                      .Where(l => l.Id == Languages[i].Id)
                      .Include(l => l.Levels)
                      .Where(l => l.Levels.Any(l => l.Id.Equals(Levels[j].Id)))
                      .SingleOrDefaultAsync(cancellationToken);
                    }
                }
            }

            return vacancy;
        }

        private async Task<Vacancy> HandleAddressAsync(Vacancy vacancy, CancellationToken cancellationToken = default)
        {
            var address = vacancy.Address;

            if (vacancy.Address != null)
            {
                address.MetroStations = null;
                vacancy.Address = null;
                vacancy.Address = address;
                return vacancy;

//                var metroStations = await _dbContext.Set<MetroStation>()
//                    .AsNoTracking()
//                    .ToListAsync(cancellationToken);

//                List<MetroStation> MetroStations = new();

//                if (vacancy.Address.MetroStations != null)
//                    MetroStations = vacancy.Address.MetroStations.ToList();

//                vacancy.Address.MetroStations = new List<MetroStation>();

//                foreach (var metroStation in metroStations)
//                {
//                    var distance = GeoHelper
//                        .CalculateDistance(vacancy.Address.Lat, vacancy.Address.Lng, metroStation.Lat, metroStation.Lng);

//                    if (distance <= GeoHelper.DefaultStationRadius)
//                    {
//#pragma warning disable CS8604
//                        ((List<MetroStation>)vacancy.Address.MetroStations).Add(
//                            await _dbContext.Set<MetroStation>()
//                            .Where(m => m.Id == metroStation.Id)
//                            .SingleOrDefaultAsync(cancellationToken));
//#pragma warning restore CS8604 
//                    }
//                }

//                ((List<MetroStation>)vacancy.Address.MetroStations).AddRange(MetroStations);
            }

            vacancy.Address = address;

            return vacancy;
        }
    }
}
