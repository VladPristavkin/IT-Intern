using Dapper;
using EventBus.IntegrationEventLog;
using Microsoft.Extensions.Logging;
using Npgsql;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Infrastructure;
public class DatabaseInitializer(string connectionString,
    ILogger<DatabaseInitializer> logger,
    IIntegrationEventService integrationEventService,
    IMetroRepository metroRepository)
{
    private readonly string _connectionString = connectionString;
    private readonly ILogger _logger = logger;
    private readonly IIntegrationEventService _integrationEventService = integrationEventService;
    private readonly IMetroRepository _metroRepository = metroRepository;

    public async Task InitializeAsync()
    {
        var connectionStringBuilder = new NpgsqlConnectionStringBuilder(_connectionString);
        var initialDatabase = connectionStringBuilder.Database;
        connectionStringBuilder.Database = "postgres";

        using (var connection = new NpgsqlConnection(connectionStringBuilder.ConnectionString))
        {
            await connection.OpenAsync();

            var databaseExists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = @DatabaseName)",
                new { DatabaseName = initialDatabase });

            if (!databaseExists)
            {
                await connection.ExecuteAsync($"CREATE DATABASE \"{initialDatabase}\"");
            }

            connection.ChangeDatabase(initialDatabase);

            var createTablesSql = @"
                CREATE TABLE IF NOT EXISTS Vacancies (
                    Id BIGSERIAL PRIMARY KEY,
                    Data TEXT NOT NULL
                );";

            connection.AddEventLogTable(logger: _logger);

            await connection.ExecuteAsync(createTablesSql);

            createTablesSql = @"
                    CREATE TABLE IF NOT EXISTS MetroLine (
                        Id BIGSERIAL PRIMARY KEY,
                        Name VARCHAR(255),
                        HexColor VARCHAR(7)
                    );";

            await connection.ExecuteAsync(createTablesSql);

            createTablesSql = @" CREATE TABLE IF NOT EXISTS MetroStation (
                        Id DOUBLE PRECISION PRIMARY KEY,
                        Name VARCHAR(255),
                        Lat DOUBLE PRECISION,
                        Lng DOUBLE PRECISION,
                         ""Order"" INT,
                        LineId BIGSERIAL,
                        FOREIGN KEY (LineId) REFERENCES MetroLine(Id)
                    );";

            await connection.ExecuteAsync(createTablesSql);

            await _integrationEventService.SaveEventAsync(new GetMetroLinesIntegrationEvent());

            await _integrationEventService.PublishEventsThroughEventBusAsync();
        }
    }
}
