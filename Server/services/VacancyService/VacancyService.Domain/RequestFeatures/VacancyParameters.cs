using VacancyService.Domain.Enums;

namespace VacancyService.Domain.RequestFeatures
{
    public class VacancyParameters : RequestParameters
    {
        public VacancyParameters()
        {
            OrderBy = OrderBy.Default;
            SearchPeriod = SearchPeriod.ByDateOfPosting;
        }
        public IEnumerable<string>? Country { get; set; }
        public string? SearchText { get; set; }
        public IEnumerable<string>? Area { get; set; }
        public IEnumerable<string>? Employment { get; set; }
        public string? Experience { get; set; }
        public IEnumerable<string>? Schedule { get; set; }
        public long? SalaryTo { get; set; }
        public IEnumerable<string>? ProfessionalRole { get; set; }
    }
}
