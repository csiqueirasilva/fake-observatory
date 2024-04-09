using System.Text.Json;
using FakeObservatory.Model.Alpaca;

namespace FakeObservatory.Tools;

public class AlpacaExceptionHandlerMiddleware
{

    private readonly RequestDelegate _next;

    public AlpacaExceptionHandlerMiddleware(RequestDelegate next) {
        _next = next;
    }

    public async Task Invoke(HttpContext context) {
        try { 
            await _next(context);
        } catch (Exception ex) {
            if(context.Response.StatusCode != StatusCodes.Status400BadRequest && context.Response.StatusCode != StatusCodes.Status500InternalServerError) {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = ex is ClientException ? StatusCodes.Status400BadRequest : StatusCodes.Status500InternalServerError;
                var response = new ApiReturn {
                    ErrorNumber = ApiReturnCode.GENERIC_ERROR, 
                    ErrorMessage = ex.Message
                };
                var jsonResponse = JsonSerializer.Serialize(response);
                await context.Response.WriteAsync(jsonResponse);
            }
        }
    }

}