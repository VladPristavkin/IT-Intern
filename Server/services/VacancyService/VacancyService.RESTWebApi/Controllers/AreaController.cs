using MediatR;
using Microsoft.AspNetCore.Mvc;
using VacancyService.Application.CQRS.Area.Queries.GetAreaCollection;
using VacancyService.Application.CQRS.Area.Queries.GetAreaDetails;

namespace VacancyService.RESTWebApi.Controllers
{
    [ApiController]
    [Route("api/areas")]
    public class AreaController : ControllerBase
    {
        private readonly ISender _sender;

        public AreaController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<IActionResult> GetAreas()
        {
            var areas = await _sender.Send(new GetAreaCollectionQuery(TrackChanges: false));

            return Ok(areas);
        }

        [HttpGet]
        [Route("{id:long}", Name = "AreaById")]
        public async Task<IActionResult> GetAreaById(long id)
        {
            var area = await _sender.Send(new GetAreaDetailsQuery(id, TrackChanges: false));

            return Ok(area);
        }
    }
}
