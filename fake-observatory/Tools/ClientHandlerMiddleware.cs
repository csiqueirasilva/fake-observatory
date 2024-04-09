using FakeObservatory.Services;
using Microsoft.Extensions.Primitives;

namespace FakeObservatory.Tools;

public class ClientHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ClientHandlerMiddleware(RequestDelegate next) {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context) {
        var endpoint = context.GetEndpoint();
        if (endpoint != null) {
            var controllerActionDescriptor = endpoint.Metadata.GetMetadata<Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor>();
            if (controllerActionDescriptor != null) {
                var controllerNamespace = controllerActionDescriptor.ControllerTypeInfo.Namespace;
                if (controllerNamespace.StartsWith("FakeObservatory.Controllers.Alpaca")) {

                    uint? clientId = null;
                    uint? clientTransactionId = null;

                    if (context.Request.Method.Equals("GET", StringComparison.OrdinalIgnoreCase)) {
                        if (context.Request.Query.TryGetValue("ClientID", out StringValues clientIdValues) &&
                            uint.TryParse(clientIdValues, out uint readClientId)) {
                            clientId = readClientId;
                        }
                        if (context.Request.Query.TryGetValue("ClientTransactionID", out StringValues transactionIdValues) &&
                            uint.TryParse(transactionIdValues, out uint readTransactionId)) {
                            clientTransactionId = readTransactionId;
                        }
                    } else {
                        if (context.Request.HasFormContentType) {
                            var form = context.Request.Form;
                            if (form.TryGetValue("ClientID", out StringValues formClientIdValues) &&
                                uint.TryParse(formClientIdValues, out uint formReadClientId)) {
                                clientId = formReadClientId;
                            }
                            if (form.TryGetValue("ClientTransactionID", out StringValues formTransactionIdValues) &&
                                uint.TryParse(formTransactionIdValues, out uint formReadTransactionId)) {
                                clientTransactionId = formReadTransactionId;
                            }
                        }
                    }
                    ClientScopeLogic.Setup(clientId, clientTransactionId);
                }
            }
        }
        await _next(context);
    }

}