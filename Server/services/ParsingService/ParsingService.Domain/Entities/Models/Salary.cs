namespace ParsingService.Domain.Entities.Models
{
    public class Salary
    {
        public required string Currency { get; set; }
        public int? From { get; set; }
        public int? To { get; set; }
        public bool Gross {  get; set; }
    }
}
