﻿using VacancyService.RESTWebApi.MIddlewares;

namespace VacancyService.RESTWebApi.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        public static void ConfigureIIS(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options => { });
        }
    }
}
