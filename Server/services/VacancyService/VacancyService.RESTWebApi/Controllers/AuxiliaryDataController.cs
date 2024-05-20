using MediatR;
using Microsoft.AspNetCore.Mvc;
using VacancyService.Application.CQRS.Queries.Area.GetAreaCollection;
using VacancyService.Application.CQRS.Queries.Area.GetAreaDetails;
using VacancyService.Application.CQRS.Queries.Employment.GetEmploymentCollection;
using VacancyService.Application.CQRS.Queries.Experience.GetExperienceCollection;
using VacancyService.Application.CQRS.Queries.KeySkill.GetKeySkillCollection;
using VacancyService.Application.CQRS.Queries.Language.GetLanguageCollection;
using VacancyService.Application.CQRS.Queries.Level.GetLevelCollection;
using VacancyService.Application.CQRS.Queries.MetroLine.GetMetroLineCollection;
using VacancyService.Application.CQRS.Queries.ProfessionalRole.GetProfessionalRoleCollection;
using VacancyService.Application.CQRS.Queries.Schedule.GetScheduleCollection;
using VacancyService.Application.CQRS.Queries.Type.GetTypeCollection;

namespace VacancyService.RESTWebApi.Controllers
{
    [ApiController]
    public class AuxiliaryDataController : ControllerBase
    {
        private readonly ISender _sender;

        public AuxiliaryDataController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        [Route("api/areas")]
        public async Task<IActionResult> GetAreas()
        {
            var areas = await _sender.Send(new GetAreaCollectionQuery(TrackChanges: false));

            return Ok(areas);
        }

        [HttpGet]
        [Route("api/areas/{id:long}", Name = "AreaById")]
        public async Task<IActionResult> GetAreaById(long id)
        {
            var area = await _sender.Send(new GetAreaDetailsQuery(id, TrackChanges: false));

            return Ok(area);
        }

        [HttpGet]
        [Route("api/employments")]
        public async Task<IActionResult> GetEmployments()
        {
            var employments = await _sender.Send(new GetEmploymentCollectionQuery(TrackChanges: false));

            return Ok(employments);
        }

        [HttpGet]
        [Route("api/experiences")]
        public async Task<IActionResult> GetExperiences()
        {
            var experiences = await _sender.Send(new GetExperienceCollectionQuery(TrackChanges: false));

            return Ok(experiences);
        }

        [HttpGet]
        [Route("api/keyskills")]
        public async Task<IActionResult> GetKeySkills()
        {
            var keySkills = await _sender.Send(new GetKeySkillCollectionQuery(TrackChanges: false));

            return Ok(keySkills);
        }

        [HttpGet]
        [Route("api/languages")]
        public async Task<IActionResult> GetLanguages()
        {
            var languages = await _sender.Send(new GetLanguageCollectionQuery(TrackChanges: false));

            return Ok(languages);
        }

        [HttpGet]
        [Route("api/languages/levels")]
        public async Task<IActionResult> GetLevels()
        {
            var levels = await _sender.Send(new GetLevelCollectionQuery(TrackChanges: false));

            return Ok(levels);
        }

        [HttpGet]
        [Route("api/metro")]
        public async Task<IActionResult> GetMetroLines()
        {
            var metroLines = await _sender.Send(new GetMetroLineCollectionQuery(TrackChanges: false));

            return Ok(metroLines);
        }

        [HttpGet]
        [Route("api/professional_roles")]
        public async Task<IActionResult> GetProfessionalRoles()
        {
            var professionalRoles = await _sender.Send(new GetProfessionalRoleCollectionQuery(TrackChanges: false));

            return Ok(professionalRoles);
        }

        [HttpGet]
        [Route("api/schedules")]
        public async Task<IActionResult> GetSchedules()
        {
            var schedules = await _sender.Send(new GetScheduleCollectionQuery(TrackChanges: false));

            return Ok(schedules);
        }

        [HttpGet]
        [Route("api/types")]
        public async Task<IActionResult> GetTypes()
        {
            var types = await _sender.Send(new GetTypeCollectionQuery(TrackChanges: false));

            return Ok(types);
        }
    }
}
