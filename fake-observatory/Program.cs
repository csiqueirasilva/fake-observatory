using FakeObservatory.Controllers.Alpaca;
using FakeObservatory.Hubs;
using FakeObservatory.Services;
using FakeObservatory.Services.Impl;
using FakeObservatory.Tools;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// controllers
builder.Services.AddScoped<CommonDeviceController>();

// logic services
builder.Services.AddScoped<ConfigurationLogic>();
builder.Services.AddScoped<CommonDeviceLogic>();

// telescope impl
builder.Services.AddScoped<FakeTelescopeLogic>();

var app = builder.Build();

// middlewares
app.UseMiddleware<AlpacaExceptionHandlerMiddleware>();

// Configure Swagger middleware
app.UseSwagger();

app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = "apidocs";
});

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.MapControllers();

//app.UseMiddleware<ClientHandlerMiddleware>();

app.MapHub<CommonDeviceHub>("/ws/common-device");

app.Run();