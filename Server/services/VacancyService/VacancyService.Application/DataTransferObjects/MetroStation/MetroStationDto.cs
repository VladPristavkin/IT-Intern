namespace VacancyService.Application.DataTransferObjects
{
    public record MetroStationDto
    {
        public required double Id { get; set; }
        public required string Name { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public int? Order { get; set; }
        public MetroLineDto? Line { get; set; }
        public IEnumerable<AddressDto>? Addresses { get; set; }
    }
}
