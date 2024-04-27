﻿namespace ParsingService.Domain.Entities.Models
{
    public class Address
    {
        public required long Id { get; set; }
        public required string Building { get; set; }
        public required string City { get; set; }
        public required string Street { get; set; }
        public string? Description { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public IEnumerable<MetroStation>? MetroStations { get; set; }
    }
}