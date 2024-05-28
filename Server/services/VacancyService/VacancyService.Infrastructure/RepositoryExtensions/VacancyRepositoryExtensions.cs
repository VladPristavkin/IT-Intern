using Microsoft.IdentityModel.Tokens;
using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.Enums;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Infrastructure.RepositoryExtensions
{
    internal static class VacancyRepositoryExtensions
    {
        internal static IQueryable<Vacancy> FilterVacancy(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            if (parameters.Area != null)
                foreach (string areaId in parameters.Area)
                {
                    if (areaId.IsNullOrEmpty()) continue;

                    if (long.TryParse(areaId, out _))
                        vacancies = vacancies.Where(v => v.Area.Id.Equals(long.Parse(areaId)));
                }

            if (parameters.Country != null)
                foreach (var countryId in parameters.Country)
                {
                    if (countryId.IsNullOrEmpty()) continue;

                    if (long.TryParse(countryId, out _))
                    {
                        vacancies = vacancies.Where(v => v.Area != null &&
                        (v.Area.Parent.Id == long.Parse(countryId) ||
                        v.Area.Parent.Parent.Id == long.Parse(countryId) ||
                        v.Area.Parent.Parent.Parent.Id == long.Parse(countryId) ||
                        v.Area.Parent.Parent.Parent.Parent.Id == long.Parse(countryId)));
                    }
                }


            //if (!string.IsNullOrEmpty(parameters.Employment))
            //    vacancies = vacancies.Where(v => v.Employment != null && v.Employment.Name.Equals(parameters.Employment));

            if (!string.IsNullOrEmpty(parameters.Experience))
                vacancies = vacancies.Where(v => v.Experience != null && v.Experience.Name.Equals(parameters.Experience));

            //if (!string.IsNullOrEmpty(parameters.Schedule))
            //    vacancies = vacancies.Where(v => v.Schedule != null && v.Schedule.Name.Equals(parameters.Schedule));

            //if (!string.IsNullOrEmpty(parameters.Type))
            //    vacancies = vacancies.Where(v => v.Type != null && v.Type.Name.Equals(parameters.Type));

            //if (parameters.SalaryFrom.HasValue)
            //    vacancies = vacancies.Where(v => v.Salary != null && v.Salary.From >= parameters.SalaryFrom.Value);

            if (parameters.SalaryFrom.HasValue)
                vacancies = vacancies.Where(v => v.Salary != null && v.Salary.From >= parameters.SalaryFrom.Value);

            //if (parameters.KeySkill != null)
            //    foreach (string keySkill in parameters.KeySkill)
            //        vacancies = vacancies.Where(v => v.KeySkills != null && v.KeySkills.Any(ks => ks.Name.Equals(keySkill)));

            //if (parameters.Language != null)
            //    foreach (string language in parameters.Language)
            //        vacancies = vacancies.Where(v => v.Languages != null && v.Languages.Any(l => l.Name.Equals(language)));

            if (parameters.ProfessionalRole != null)
                foreach (string role in parameters.ProfessionalRole)
                {
                    if (role.IsNullOrEmpty()) continue;

                    if (long.TryParse(role, out _))
                    {
                        vacancies = vacancies.Where(v => v.ProfessionalRoles.Any(pr => pr.Id.Equals(long.Parse(role))));
                    }
                    else
                    {
                        vacancies = vacancies.Where(v => v.ProfessionalRoles.Any(pr => pr.Name.Equals(role)));
                    }
                }

            //if (!string.IsNullOrEmpty(parameters.WebsiteName))
            //    vacancies = vacancies.Where(v => v.Employer != null && v.WebsiteName.Equals(parameters.WebsiteName));

            return vacancies;
        }

        internal static IQueryable<Vacancy> Search(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            if (parameters.SearchPeriod == SearchPeriod.PerMonth)
                vacancies = vacancies.Where(v => v.PublishedAt >= DateTime.UtcNow.AddMonths(-1));

            if (parameters.SearchPeriod == SearchPeriod.PerWeek)
                vacancies = vacancies.Where(v => v.PublishedAt >= DateTime.UtcNow.AddDays(-7));

            if (parameters.SearchPeriod == SearchPeriod.InThreeDays)
                vacancies = vacancies.Where(v => v.PublishedAt >= DateTime.UtcNow.AddDays(-3));

            if (string.IsNullOrWhiteSpace(parameters.SearchText))
                return vacancies;

            var lowerCaseSearchText = parameters.SearchText.Trim().ToLower();

            return vacancies.Where(v => v.Name.ToLower().Contains(lowerCaseSearchText) ||
            (v.Description.ToLower().Contains(lowerCaseSearchText)) ||
            (v.Employer.Name.ToLower().Contains(lowerCaseSearchText)) ||
            (v.KeySkills.Any(ks => ks.Name.ToLower().Contains(lowerCaseSearchText))) ||
            (v.Languages.Any(l => l.Name.ToLower().Contains(lowerCaseSearchText))) ||
            (v.ProfessionalRoles.Any(pr => pr.Name.ToLower().Contains(lowerCaseSearchText))));
        }

        internal static IQueryable<Vacancy> Sort(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            if (parameters.OrderBy == OrderBy.SalaryAsc)
                vacancies = vacancies.OrderBy(v => v.Salary.To.HasValue ? v.Salary.To.Value : int.MaxValue);

            if (parameters.OrderBy == OrderBy.SalaryDesc)
                vacancies = vacancies.OrderByDescending(v => v.Salary.To.HasValue ? v.Salary.To.Value : int.MinValue);

            return vacancies;
        }
    }
}
