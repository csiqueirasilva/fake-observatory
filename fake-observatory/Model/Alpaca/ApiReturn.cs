using System.Text.Json.Serialization;
using FakeObservatory.Services;
using FakeObservatory.Tools;

namespace FakeObservatory.Model.Alpaca;

public class ApiReturn {

    public ApiReturn() {
    }

    public ApiReturn(ApiReturnCode errorNumber, string errorMessage) {
        ErrorNumber = errorNumber;
        ErrorMessage = errorNumber == ApiReturnCode.SUCCESS ? string.Empty : errorMessage;
    }

    public ApiReturn(ApiReturnCode errorNumber, string errorMessage, bool value) {
        ErrorNumber = errorNumber;
        ErrorMessage = errorNumber == ApiReturnCode.SUCCESS ? string.Empty : errorMessage;
        Value = value;
    }

    public ApiReturn(bool value) {
        Value = value;
    }

    [JsonPropertyName("ClientTransactionID")]
    public uint ClientTransactionId { get; set; } = ClientScopeLogic.ClientTransactionId;
    
    [JsonPropertyName("ServerTransactionID")]
    public uint ServerTransactionId { get; set; } = ClientScopeLogic.ServerTransactionId;

    [JsonPropertyName("ErrorNumber")]
    [JsonConverter(typeof(EnumIntConverter))]
    public ApiReturnCode ErrorNumber { get; set; } = ApiReturnCode.SUCCESS;

    [JsonPropertyName("ErrorMessage")]
    public string ErrorMessage { get; set; } = "";

    [JsonPropertyName("Value")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Value { get; set; } = null;

}