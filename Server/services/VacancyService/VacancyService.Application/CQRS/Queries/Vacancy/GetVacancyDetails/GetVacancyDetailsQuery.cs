﻿using MediatR;
using VacancyService.Application.DataTransferObjects;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Application.CQRS.Queries.Vacancy.GetVacancyDetails
{
    public sealed record GetVacancyDetailsQuery(long Id, VacancyParameters VacancyParameters, bool TrackChanges) : IRequest<VacancyDto>;
}
