using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ParsingService.Infrastructure.HostedService
{
    public class DatabaseInitializationHostedService : IHostedService
    {
        private readonly DatabaseInitializer _databaseInitializer;
        private readonly ILogger<DatabaseInitializationHostedService> _logger;

        public DatabaseInitializationHostedService(DatabaseInitializer databaseInitializer, 
            ILogger<DatabaseInitializationHostedService> logger)
        {
            _databaseInitializer = databaseInitializer;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting database initialization...");
            await _databaseInitializer.InitializeAsync();
            _logger.LogInformation("Database initialization completed.");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
