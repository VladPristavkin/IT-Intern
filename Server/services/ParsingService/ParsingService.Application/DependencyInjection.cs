using EventBus;
using EventBus.IntegrationEventLog.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.Services;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddSingleton<IIntegrationEventService, IntegrationEventService>();
            services.AddSingleton<IIntegrationEventLogService, IntegrationEventLogService<DbContext>>();
            services.AddSingleton<IVacancyProcessingService, VacancyProcessingService>();

            return services;
        }

        public static IHostApplicationBuilder ConfigureEventHandling(this IHostApplicationBuilder builder)
        {
            builder.AddRabbitMqEventBus();

            return builder;
        }

        public static IApplicationBuilder ConfigureVacancyProcessingService(this IApplicationBuilder app,
            IHostApplicationLifetime lifetime)
        {
            var cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = cancellationTokenSource.Token;

            var vacancyProcessingService = app.ApplicationServices.GetRequiredService<IVacancyProcessingService>();

            var schedulerTask = vacancyProcessingService.ProcessVacanciesAsync(cancellationToken);

            lifetime.ApplicationStopping.Register(() =>
            {
                cancellationTokenSource.Cancel();
                schedulerTask.GetAwaiter().GetResult();
            });

            return app;
        }
    }
}
