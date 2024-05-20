using MediatR;
using Microsoft.AspNetCore.Mvc;
using VacancyService.Application.CQRS.Commands.Vacancy.CreateVacancyCommand;
using VacancyService.Application.CQRS.Commands.Vacancy.DeleteVacancyCommand;
using VacancyService.Application.CQRS.Commands.Vacancy.UpdateVacancyCommand;
using VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyCollection;
using VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyDetails;
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
                return BadRequest("VacancyForCreationDto cannot be null.");

            var vacancy = await _sender.Send(new CreateVacancyCommand(vacancyForCreation));

            return CreatedAtRoute("VacancyById", new { id = vacancy.Id }, vacancy);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteVacancy(long id)
        {
            await _sender.Send(new DeleteVacancyCommand(Id: id, TrackChanges: false));

            return NoContent();
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> UpdateVacancy(long id, [FromBody] VacancyForUpdateDto vacancyForUpdate)
        {
            if (vacancyForUpdate == null)
                return BadRequest("VacancyForUpdateDto cannot be null.");

            await _sender.Send(new UpdateVacancyCommand(id, vacancyForUpdate, TrackChanges: true));

            return NoContent();
        }
    }
}
