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

        //public static void ConfigureDbContext(this IServiceCollection services, IConfigurationRoot configuration)
        //{
        //    services.AddDbContext<RepositoryDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("PostgresqlConnectionString")));
        //}

        //public static void ConfigureLoggerManager(this IServiceCollection services)
        //{
        //    services.AddSingleton<ILoggerManager, LoggerManager>();
        //}

        //public static void ConfigureRepositoryManager(this IServiceCollection services)
        //{
        //    services.AddScoped<IRepositoryManager, RepositoryManager>();
        //}

        //public static void ConfigureServiceManager(this IServiceCollection services)
        //{
        //    services.AddScoped<IServiceManager, ServiceManager>();
        //}
    }
}
