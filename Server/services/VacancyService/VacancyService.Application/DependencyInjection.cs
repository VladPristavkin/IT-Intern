using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using MediatR;
using Microsoft.Extensions.Hosting;
using EventBus;
using EventBus.Interfaces;
using EventBus.Extensions;
using VacancyService.Application.Events;
using VacancyService.Application.EventHandlers;

namespace VacancyService.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(config => config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }

        public static IHostApplicationBuilder ConfigureEventHandling(this IHostApplicationBuilder builder)
        {
            builder.AddRabbitMqEventBus()
                .AddSubscription<VacancyCreatedIntegrationEvent, VacancyCreatedIntegrationEventHandler>();

            return builder;
        }
    }
}
