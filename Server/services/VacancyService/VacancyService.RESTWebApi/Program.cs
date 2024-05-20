using VacancyService.RESTWebApi.Extensions;
using VacancyService.Application;
using VacancyService.Infrastructure;
using VacancyService.RESTWebApi.MIddlewares;

var builder = WebApplication.CreateBuilder(args);

//LogManager.LoadConfiguration(string.Concat(AppDomain.CurrentDomain.BaseDirectory, "\\nlog.config"));

builder.Services.ConfigureCors();
builder.Services.ConfigureIIS();

builder.ConfigureEventHandling();

builder.Services.ConfigureJWT(builder.Configuration);

builder.Services.AddApplication();
builder.Services.AddInfractructure(builder.Configuration);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });

var app = builder.Build();

//var logger = app.Services.GetRequiredService<ILoggerManager>();
app.ConfigureExceptionHandler(/*logger*/);
app.UseMiddleware<InitializeDatabaseMiddleware>(builder.Configuration);


if (app.Environment.IsProduction())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.All
});

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();