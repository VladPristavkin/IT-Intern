namespace VacancyService.Domain.RequestFeatures
{
    public class VacancyParameters : RequestParameters
    {
        public VacancyParameters()
        {
            OrderBy = "relevance";
            SearchPeriod = "all_time";
        }

        public string? SearchText { get; set; }
        public IEnumerable<string>? AreaId { get; set; }
        public string? Employment { get; set; }
        public string? Experience { get; set; }
        public string? Schedule {  get; set; }
        public string? Type { get; set; }   
        public long? SalaryFrom { get; set; }
        public long? SalaryTo { get; set; }
        public IEnumerable<string>? KeySkill {  get; set; }
        public IEnumerable<string>? Language { get; set; }
        public IEnumerable<string>? ProfessionalRole { get; set; } 
        public string? WebsiteName { get; set; }    
    }
}
