﻿namespace VacancyService.Application.DataTransferObjects
{
    public record AddressForUpdateDto
    {
        public required long Id { get; set; }

        public required string Building { get; set; }

        public required string City { get; set; }

        public required string Street { get; set; }

        public string? Description { get; set; }

        public double Lat { get; set; }

        public double Lng { get; set; }
    }
}
