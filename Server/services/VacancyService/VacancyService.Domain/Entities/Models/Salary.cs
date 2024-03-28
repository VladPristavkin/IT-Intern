namespace VacancyService.Domain.Entities.Models
{
    public class Salary
    {
        public required string Currency { get; set; }
        public required int From { get; set; }
        public int? To { get; set; }
        public bool Gross {  get; set; }
    }
}
