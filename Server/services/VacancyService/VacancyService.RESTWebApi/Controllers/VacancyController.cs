using MediatR;
using Microsoft.AspNetCore.Mvc;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;
using VacancyService.Application.Vacancies.Queries.GetVacancyCollection;
using VacancyService.Application.Vacancies.Queries.GetVacancyDetails;

namespace VacancyService.RESTWebApi.Controllers
{
    [ApiController]
    [Route("api/vacancies")]
    public class VacancyController : ControllerBase
    {
        private readonly ISender _sender;

        public VacancyController(ISender sender) => _sender = sender;

        [HttpGet]
        public async Task<IActionResult> GetAllVacancies()
        {
            var vacancies = await _sender.Send(new GetVacancyCollectionQuery(TrackChanges: false));

            vacancies = new List<VacancyDto>() { new VacancyDto() { Id = 1 } };

            return Ok(vacancies);
        }

        [HttpGet("{id:long}", Name = "VacancyById")]
        public async Task<IActionResult> GetVacancyById(long id)
        {
            var vacancy = await _sender.Send(new GetVacancyDetailsQuery(Id: id, TrackChanges: false));

            return Ok(vacancy);
        }
    }
}
