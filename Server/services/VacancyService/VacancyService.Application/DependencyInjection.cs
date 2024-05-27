using EventBus;
using EventBus.IntegrationEventLog.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ParsingService.Application.Services;
using System.Reflection;
using VacancyService.Application.EventHandlers;
using VacancyService.Application.Events;

namespace VacancyService.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(config => config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddScoped<IIntegrationEventLogService, EFIntegrationEventLogService>(sp =>
            {
                var dbContext = sp.GetRequiredService<DbContext>();
                return new EFIntegrationEventLogService(dbContext, typeof(DependencyInjection));
            });

            services.AddScoped<IIntegrationEventService, IntegrationEventService>();

            return services;
        }

        public static IHostApplicationBuilder ConfigureEventHandling(this IHostApplicationBuilder builder)
        {
            builder.AddRabbitMqEventBus()
                .AddSubscription<VacancyCreatedIntegrationEvent, VacancyCreatedIntegrationEventHandler>()
                .AddSubscription<GetMetroLinesIntegrationEvent, GetMetroLinesIntegrationEventHandler>();

            return builder;
        }
    }
}
