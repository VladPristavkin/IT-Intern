using Dapper;
using EventBus.IntegrationEventLog;
using Microsoft.Extensions.Logging;
using Npgsql;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.Events;

namespace ParsingService.Infrastructure;
public class DatabaseInitializer(string connectionString, ILogger logger, IIntegrationEventService integrationEventService)
{
    private readonly string _connectionString = connectionString;
    private readonly ILogger _logger = logger;
    private readonly IIntegrationEventService _integrationEventService = integrationEventService;
    public static bool IsRequest = false;

    public async Task InitializeAsync()
    {
        var connectionStringBuilder = new NpgsqlConnectionStringBuilder(_connectionString);
        var initialDatabase = connectionStringBuilder.Database;

        using (var connection = new NpgsqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            var createDatabaseSql = $@"
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = '{initialDatabase}') THEN
                        CREATE DATABASE ""{initialDatabase}"";
                    END IF;
                END
                $$;";


            await connection.ExecuteAsync(createDatabaseSql);

            connection.ChangeDatabase(initialDatabase);

            var createTablesSql = @"
                CREATE TABLE IF NOT EXISTS Vacancies (
                    Id BIGSERIAL PRIMARY KEY,
                    Data JSONB NOT NULL
                );";

            connection.AddEventLogTable(logger: _logger);

            await connection.ExecuteAsync(createTablesSql);

            createTablesSql = @"
                    CREATE TABLE IF NOT EXISTS MetroLine (
                        Id BIGSERIAL PRIMARY KEY,
                        Name VARCHAR(255),
                        HexColor VARCHAR(7)
                    );

                    CREATE TABLE IF NOT EXISTS MetroStation (
                        Id DOUBLE PRIMARY KEY,
                        Name VARCHAR(255),
                        Lat DOUBLE PRECISION,
                        Lng DOUBLE PRECISION,
                        Order INT,
                        LineId BIGSERIAL,
                        FOREIGN KEY (LineId) REFERENCES MetroLine(Id)
                    );";

            await connection.ExecuteAsync(createTablesSql);

            await _integrationEventService.SaveEventAsync(new GetMetroLinesIntegrationEvent());

            await _integrationEventService.PublishEventsThroughEventBusAsync();
        }
    }
}
