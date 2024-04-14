using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using VacancyService.Application.CQRS.Vacancies.Commands.CreateVacancyCommand;
using VacancyService.Application.CQRS.Vacancies.Queries.GetVacancyCollection;
using VacancyService.Application.CQRS.Vacancies.Queries.GetVacancyDetails;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.RESTWebApi.Controllers
{
    [ApiController]
    [Route("api/vacancies")]
    public class VacancyController : ControllerBase
    {
        private readonly ISender _sender;

        public VacancyController(ISender sender) => _sender = sender;

        [HttpGet]
        public async Task<IActionResult> GetAllVacancies([FromQuery] VacancyParameters vacancyParameters)
        {
            var resultInfo = await _sender.Send(
                new GetVacancyCollectionQuery(VacancyParameters: vacancyParameters, TrackChanges: false));

            return Ok(resultInfo);
        }

        [HttpGet("{id:long}", Name = "VacancyById")]
        public async Task<IActionResult> GetVacancyById(long id, [FromQuery] VacancyParameters vacancyParameters)
        {
            var vacancy = await _sender.Send(
                new GetVacancyDetailsQuery(Id: id, VacancyParameters: vacancyParameters, TrackChanges: false));

            return Ok(vacancy);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVacancy([FromBody] VacancyForCreationDto vacancyForCreation)
        {
            if (vacancyForCreation == null)
                return BadRequest("");

            var vacancy = await _sender.Send(new CreateVacancyCommand(vacancyForCreation));

            return CreatedAtRoute("VacancyById", new { id = vacancy.Id }, vacancy);
        }
    }
}
