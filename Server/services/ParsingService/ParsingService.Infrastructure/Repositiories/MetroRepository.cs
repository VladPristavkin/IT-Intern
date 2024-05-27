using Dapper;
using Npgsql;
using ParsingService.Domain.Abstractions;
using ParsingService.Domain.Entities.Models;

namespace ParsingService.Infrastructure.Repositiories
{
    public class MetroRepository(string connectionString) : IMetroRepository
    {
        private readonly string _connectionString = connectionString;

        public async Task AddMetro(IEnumerable<MetroLine> metroLines)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = await connection.BeginTransactionAsync())
                {
                    try
                    {
                        foreach (var metroLine in metroLines)
                        {
                            var insertMetroLineSql = @"
                                INSERT INTO MetroLine (Id, Name, HexColor)
                                VALUES (@Id, @Name, @HexColor)
                                ON CONFLICT (Id) DO UPDATE SET
                                Name = EXCLUDED.Name,
                                HexColor = EXCLUDED.HexColor;";

                            await connection.ExecuteAsync(insertMetroLineSql, new
                            {
                                metroLine.Id,
                                metroLine.Name,
                                metroLine.HexColor
                            }, transaction);

                            if (metroLine.Stations != null)
                            {
                                foreach (var station in metroLine.Stations)
                                {
                                    var insertMetroStationSql = @"
                                        INSERT INTO MetroStation (Id, Name, Lat, Lng, ""Order"", LineId)
                                        VALUES (@Id, @Name, @Lat, @Lng, @Order, @LineId)
                                        ON CONFLICT (Id) DO UPDATE SET
                                        Name = EXCLUDED.Name,
                                        Lat = EXCLUDED.Lat,
                                        Lng = EXCLUDED.Lng,
                                        ""Order"" = EXCLUDED.""Order"",
                                        LineId = EXCLUDED.LineId;";

                                    await connection.ExecuteAsync(insertMetroStationSql, new
                                    {
                                        station.Id,
                                        station.Name,
                                        station.Lat,
                                        station.Lng,
                                        station.Order,
                                        LineId = metroLine.Id
                                    }, transaction);
                                }
                            }
                        }

                        await transaction.CommitAsync();
                    }
                    catch (Exception)
                    {
                        await transaction.RollbackAsync();
                        throw;
                    }
                }
            }
        }

        public async Task<IEnumerable<MetroLine>> GetAllMetroLinesAsync()
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var metroLines = await connection.QueryAsync<MetroLine>(@"
                    SELECT Id, Name, HexColor
                    FROM MetroLine");

                var linesDictionary = metroLines.ToDictionary(line => line.Id);

                var metroStations = await connection.QueryAsync<MetroStation>(@"
                    SELECT Id, Name, Lat, Lng, ""Order"", LineId
                    FROM MetroStation");

                foreach (var station in metroStations)
                {
                    if (station.LineId.HasValue && linesDictionary.TryGetValue(station.LineId.Value, out var line))
                    {
                        if (line.Stations == null)
                        {
                            line.Stations = new List<MetroStation>();
                        }

                        ((List<MetroStation>)line.Stations).Add(station);
                    }
                }

                return linesDictionary.Values;
            }
        }
    }
}
