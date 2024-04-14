using VacancyService.Domain.Entities.Models;
using VacancyService.Domain.RequestFeatures;

namespace VacancyService.Infrastructure.RepositoryExtensions
{
    internal static class VacancyRepositoryExtensions
    {
        internal static IQueryable<Vacancy> FilterVacancy(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            if (parameters.AreaId != null)
                foreach (string areaId in parameters.AreaId)
                    vacancies = vacancies.Where(v => v.Area != null && v.Area.Id.Equals(areaId));

            if (!string.IsNullOrEmpty(parameters.Employment))
                vacancies = vacancies.Where(v => v.Employment != null && v.Employment.Name.Equals(parameters.Employment));

            if (!string.IsNullOrEmpty(parameters.Experience))
                vacancies = vacancies.Where(v => v.Experience != null && v.Experience.Name.Equals(parameters.Experience));

            if (!string.IsNullOrEmpty(parameters.Schedule))
                vacancies = vacancies.Where(v => v.Schedule != null && v.Schedule.Name.Equals(parameters.Schedule));

            if (!string.IsNullOrEmpty(parameters.Type))
                vacancies = vacancies.Where(v => v.Type != null && v.Type.Name.Equals(parameters.Type));

            if (parameters.SalaryFrom.HasValue)
                vacancies = vacancies.Where(v => v.Salary != null && v.Salary.From >= parameters.SalaryFrom.Value);

            if (parameters.SalaryTo.HasValue)
                vacancies = vacancies.Where(v => v.Salary != null && v.Salary.To <= parameters.SalaryTo.Value);

            if (parameters.KeySkill != null)
                foreach (string keySkill in parameters.KeySkill)
                    vacancies = vacancies.Where(v => v.KeySkills != null && v.KeySkills.Any(ks => ks.Name.Equals(keySkill)));

            if (parameters.Language != null)
                foreach (string language in parameters.Language)
                    vacancies = vacancies.Where(v => v.Languages != null && v.Languages.Any(l => l.Name.Equals(language)));

            if (parameters.ProfessionalRole != null)
                foreach (string role in parameters.ProfessionalRole)
                    vacancies = vacancies.Where(v => v.ProfessionalRoles != null && v.ProfessionalRoles.Any(pr => pr.Name.Equals(role)));

            if (!string.IsNullOrEmpty(parameters.WebsiteName))
                vacancies = vacancies.Where(v => v.Employer != null && v.WebsiteName.Equals(parameters.WebsiteName));

            return vacancies;
        }

        internal static IQueryable<Vacancy> Search(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            if (string.IsNullOrWhiteSpace(parameters.SearchText))
                return vacancies;

            var lowerCaseSearchText = parameters.SearchText.Trim().ToLower();

            return vacancies.Where(v => v.Name.ToLower().Contains(lowerCaseSearchText)); //||
            //                            (v.Description != null && v.Description.ToLower().Contains(lowerCaseSearchText)) ||
            //                            (v.Employer != null && v.Employer.Name.ToLower().Contains(lowerCaseSearchText)) ||
            //                            (v.KeySkills != null && v.KeySkills.Any(ks => ks.Name.ToLower().Contains(lowerCaseSearchText))) ||
            //                            (v.Languages != null && v.Languages.Any(l => l.Name.ToLower().Contains(lowerCaseSearchText))) ||
            //                            (v.ProfessionalRoles != null && v.ProfessionalRoles.Any(pr => pr.Name.ToLower().Contains(lowerCaseSearchText))));
        }

        internal static IQueryable<Vacancy> Sort(this IQueryable<Vacancy> vacancies, VacancyParameters parameters)
        {
            throw new NotImplementedException();
        }
    }
}
