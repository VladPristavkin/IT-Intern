using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace VacancyService.RESTWebApi.Controllers
{
    [ApiController]
    [Route("api/vacancies")]
    public class VacancyController : ControllerBase
    {
        private readonly ISender _sender;

        public VacancyController(ISender sender) => _sender = sender;
    }
}
