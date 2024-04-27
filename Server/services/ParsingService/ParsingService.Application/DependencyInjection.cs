using EventBus;
using EventBus.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.EventHandlers;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Application.Services;
using ParsingService.Domain.Abstractions;

namespace ParsingService.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            //services.AddMediatR(config=>config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
            //services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddSingleton<IVacancyProcessingService, VacancyProcessingService>();
            services.AddSingleton<IIntegrationEventService, IntegrationEventService>();

            return services;
        }

        public static IHostApplicationBuilder ConfigureEventHandling(this IHostApplicationBuilder builder)
        {
            builder.AddRabbitMqEventBus()
                .AddSubscription<ParsingConfigurationLoadedIntegrationEvent, ParsingConfigurationLoadedIntegrationEventHandler>();

            return builder;
        }

        public static IApplicationBuilder ConfigureVacancyProcessingScheduler(this IApplicationBuilder app,
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
