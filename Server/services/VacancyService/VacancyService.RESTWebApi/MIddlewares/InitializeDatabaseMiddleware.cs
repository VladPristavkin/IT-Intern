using Microsoft.EntityFrameworkCore;
using VacancyService.Application.Common.Helpers;
using VacancyService.Domain.Entities.Exceptions;
using VacancyService.Domain.Entities.Models;
using Type = VacancyService.Domain.Entities.Models.Type;
using VacancyService.Infrastructure.DbContexts;

namespace VacancyService.RESTWebApi.MIddlewares
{
    public class InitializeDatabaseMiddleware
    {
        private readonly RequestDelegate next;

        private readonly IConfiguration _configuration;

        private static bool isInitialized = false;

        private static object locker = new();

        public InitializeDatabaseMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            this.next = next;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
        {
            if (!isInitialized)
            {
                lock (locker)
                {
                    if (!isInitialized)
                    {
                        InitializeDatabase(serviceProvider);
                        SeedDatabase(serviceProvider);

                        isInitialized = true;
                    }
                }
            }

            await next.Invoke(context);
        }

        private void InitializeDatabase(IServiceProvider serviceProvider)
        {
            var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();

            dbContext.Database.Migrate();
        }

        private void SeedDatabase(IServiceProvider serviceProvider)
        {
            var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();

            SeedArea(dbContext);
            SeedMetroLine(dbContext);
            SeedEmployment(dbContext);
            SeedLevel(dbContext);
            SeedExperience(dbContext);
            SeedLanguage(dbContext);
            SeedProfessionalRole(dbContext);
            SeedSchedule(dbContext);
            SeedType(dbContext);
        }

        private void SeedArea(DbContext dbContext)
        {
            if (dbContext.Set<Area>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var areas = JsonHelper.ReadFromJsonFile<IEnumerable<Area>>(path + "\\Area.json")?.ToList();

            foreach (var area in areas)
            {
                RecursivelyTraverseAreas(area);
            }

            void RecursivelyTraverseAreas(Area area)
            {
                if (area.Areas != null && area.Areas.Any())
                {
                    foreach (var childArea in area.Areas)
                    {
                        RecursivelyTraverseAreas(childArea);
                    }
                }

                if (area.Areas == null) return;

                foreach (var subArea in area.Areas)
                {
                    subArea.Parent = area;
                }
            }

            dbContext.Set<Area>().AddRange(areas);
            dbContext.SaveChanges();
        }

        private void SeedEmployment(DbContext dbContext)
        {
            if (dbContext.Set<Employment>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var employments = JsonHelper.ReadFromJsonFile<IEnumerable<Employment>>(path + "\\Employment.json")?.ToList();

            dbContext.Set<Employment>().AddRange(employments);
            dbContext.SaveChanges();
        }

        private void SeedExperience(DbContext dbContext)
        {
            if (dbContext.Set<Experience>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var experiences = JsonHelper.ReadFromJsonFile<IEnumerable<Experience>>(path + "\\Experience.json")?.ToList();

            dbContext.Set<Experience>().AddRange(experiences);
            dbContext.SaveChanges();
        }

        private void SeedLevel(DbContext dbContext)
        {
            if (dbContext.Set<Level>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var levels = JsonHelper.ReadFromJsonFile<IEnumerable<Level>>(path + "\\Level.json")?.ToList();

            dbContext.Set<Level>().AddRange(levels);
            dbContext.SaveChanges();
        }

        private void SeedLanguage(DbContext dbContext)
        {
            if (dbContext.Set<Language>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var languages = JsonHelper.ReadFromJsonFile<IEnumerable<Language>>(path + "\\Language.json")?.ToList();

            var levels = dbContext.Set<Level>().ToList();

            foreach (var language in languages)
            {
                language.Levels = new List<Level>();

                foreach (var level in levels)
                {
                    language.Levels.ToList().Add(level);

                    level.Languages ??= new List<Language>();

                    ((List<Language>)level.Languages).Add(language);
                }
            }

            dbContext.Set<Language>().AddRange(languages);
            dbContext.SaveChanges();
        }

        private void SeedMetroLine(DbContext dbContext)
        {
            if (dbContext.Set<MetroLine>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var metroLines = JsonHelper.ReadFromJsonFile<IEnumerable<MetroLine>>(path + "\\MetroLine.json")?.ToList();

            var areas = dbContext.Set<Area>().ToList();

            foreach (var metroLine in metroLines)
            {
                if (metroLine.Area == null) return;

                metroLine.Area = areas.Find(area => area.Id.Equals(metroLine.Area.Id));

                if (metroLine.Stations == null) return;

                for (int i = 1; i <= metroLine.Stations.Count(); i++)
                {
                    string stationId = $"{metroLine.Id}{i:D4}";
                    metroLine.Stations.ToList()[i - 1].Id = (double)decimal.Parse(stationId);
                }
            }

            dbContext.Set<MetroLine>().AddRange(metroLines);
            dbContext.SaveChanges();
        }

        private void SeedProfessionalRole(DbContext dbContext)
        {
            if (dbContext.Set<ProfessionalRole>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var professionalRoles = JsonHelper.ReadFromJsonFile<IEnumerable<ProfessionalRole>>(path + "\\ProfessionalRole.json")?.ToList();

            foreach (var professionalRole in professionalRoles)
            {
                RecursivelyTraverseAreas(professionalRole);
            }

            void RecursivelyTraverseAreas(ProfessionalRole professionalRole)
            {
                if (professionalRole.Roles != null && professionalRole.Roles.Any())
                {
                    foreach (var childRole in professionalRole.Roles)
                    {
                        RecursivelyTraverseAreas(childRole);
                    }
                }

                if (professionalRole.Roles == null) return;

                foreach (var childRole in professionalRole.Roles)
                {
                    childRole.Parent = professionalRole;
                }
            }

            dbContext.Set<ProfessionalRole>().AddRange(professionalRoles);
            dbContext.SaveChanges();
        }

        private void SeedSchedule(DbContext dbContext)
        {
            if (dbContext.Set<Schedule>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var schedules = JsonHelper.ReadFromJsonFile<IEnumerable<Schedule>>(path + "\\Schedule.json")?.ToList();

            dbContext.Set<Schedule>().AddRange(schedules);
            dbContext.SaveChanges();
        }

        private void SeedType(DbContext dbContext)
        {
            if (dbContext.Set<Type>().Any()) return;

            string path = _configuration.GetSection("Pathes").GetSection("ResourceFiles").Value ?? throw new IncorrectResourceFilePathException();

            var types = JsonHelper.ReadFromJsonFile<IEnumerable<Type>>(path + "\\Type.json")?.ToList();

            dbContext.Set<Type>().AddRange(types);
            dbContext.SaveChanges();
        }
    }
}
