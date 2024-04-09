using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using FakeObservatory.Model.Alpaca;

namespace FakeObservatory.Tools;

public class EnumIntConverter : JsonConverter<ApiReturnCode> {

    public override ApiReturnCode Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, ApiReturnCode value, JsonSerializerOptions options) {
        writer.WriteNumberValue(Convert.ToInt32(value));
    }
    
}