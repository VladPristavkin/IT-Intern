namespace VacancyService.Domain.Entities.Models
{
    public class MetroStation
    {
        public required double Id { get; set; }
        public string? Name { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int? Order { get; set; }
        public long? LineId { get; set; }
        public MetroLine? Line { get; set; }
        public IEnumerable<Address>? Addresses { get; set; }
    }
}
