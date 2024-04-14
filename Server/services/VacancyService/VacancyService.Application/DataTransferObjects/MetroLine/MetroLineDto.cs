namespace VacancyService.Application.DataTransferObjects
{
    public record MetroLineDto
    {
        public required long Id { get; set; }
        public required string Name { get; set; }
        public string? HexColor { get; set; }
        public AreaDto? Area { get; set; }
        public IEnumerable<MetroStationDto>? Stations { get; set; }
    }
}
