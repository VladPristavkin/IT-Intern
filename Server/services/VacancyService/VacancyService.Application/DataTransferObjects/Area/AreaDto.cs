namespace VacancyService.Application.DataTransferObjects
{
    public record AreaDto
    {
        public required long Id { get; set; }

        public required string Name { get; set; }

        public long? ParentId { get; set; }

        public IEnumerable<AreaDto>? Areas { get; set; }
    }
}
