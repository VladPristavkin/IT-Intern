namespace VacancyService.Application.DataTransferObjects
{
    public record TypeDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}
