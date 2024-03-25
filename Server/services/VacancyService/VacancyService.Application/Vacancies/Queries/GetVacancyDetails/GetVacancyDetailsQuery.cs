using MediatR;
using VacancyService.Application.DataTransferObjects.DTOs.Vacancy;

namespace VacancyService.Application.Vacancies.Queries.GetVacancyDetails
{
    public sealed record GetVacancyDetailsQuery(long Id, bool TrackChanges) : IRequest<VacancyDto>;
}
