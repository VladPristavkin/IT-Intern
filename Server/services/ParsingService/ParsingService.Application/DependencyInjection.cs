﻿using EventBus;
using EventBus.IntegrationEventLog.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;
using ParsingService.Application.IntegrationEvents;
using ParsingService.Application.IntegrationEvents.EventHandlers;
using ParsingService.Application.IntegrationEvents.Events;
using ParsingService.Application.Services;
using ParsingService.Domain.Abstractions;
using System.Data;
using System.Data.Common;

namespace ParsingService.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IIntegrationEventService, IntegrationEventService>();

            services.AddSingleton<IIntegrationEventLogService, DapperIntegrationEventLogService>(options =>
            {
                var connectionString = configuration.GetConnectionString("DbConnectionString");
                return new DapperIntegrationEventLogService(connectionString, "Npgsql", typeof(DependencyInjection));
            });

            services.AddSingleton<IVacancyProcessingService, VacancyProcessingService>();

            return services;
        }

        public static IHostApplicationBuilder ConfigureEventHandling(this IHostApplicationBuilder builder)
        {
            builder.AddRabbitMqEventBus()
                .AddSubscription<FillMetroIntegrationEvent, FillMetroIntegrationEventHandler>();

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
