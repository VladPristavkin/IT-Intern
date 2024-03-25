using VacancyService.RESTWebApi.Extensions;
using VacancyService.Application;
using VacancyService.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

//LogManager.LoadConfiguration(string.Concat(AppDomain.CurrentDomain.BaseDirectory, "\\nlog.config"));

builder.Services.ConfigureCors();
builder.Services.ConfigureIIS();

builder.Services.AddApplication();
builder.Services.AddInfractructure(builder.Configuration);

builder.Services.AddControllers(); //AddNewtonsoftJson(options =>
//options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
//builder.Services.ConfigureDbContext(builder.Configuration);
//builder.Services.ConfigureLoggerManager();
//builder.Services.AddAutoMapper(typeof(Program));
//builder.Services.ConfigureRepositoryManager();
//builder.Services.ConfigureServiceManager();

var app = builder.Build();

//var logger = app.Services.GetRequiredService<ILoggerManager>();
app.ConfigureExceptionHandler(/*logger*/);


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

app.UseAuthorization();

app.MapControllers();

app.Run();