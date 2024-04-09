using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using FakeObservatory.Model.Alpaca;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace FakeObservatory.Tools;

public class EnumDeviceConverter : JsonConverter<DeviceType>, IModelBinder {

    public Task BindModelAsync(ModelBindingContext bindingContext) {
        if (bindingContext == null) {
            throw new ClientException(nameof(bindingContext));
        }

        var modelName = bindingContext.ModelName;
        var valueProviderResult = bindingContext.ValueProvider.GetValue(modelName);

        if (valueProviderResult == ValueProviderResult.None) {
            return Task.CompletedTask;
        }

        bindingContext.ModelState.SetModelValue(modelName, valueProviderResult);

        var value = valueProviderResult.FirstValue;

        // Assuming DeviceType is your enum
        if (Enum.TryParse(typeof(DeviceType), value, true, out var result)) {
            bindingContext.Result = ModelBindingResult.Success(result);
        } else {
            bindingContext.ModelState.TryAddModelError(modelName, "Error parsing device type");
        }

        return Task.CompletedTask;
    }

    public override DeviceType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
        if(Enum.TryParse<DeviceType>(reader.GetString(), true, out var result)) {
            return result;
        } else {
            throw new ClientException("Error deserializing DeviceType");
        }
    }

    public override void Write(Utf8JsonWriter writer, DeviceType value, JsonSerializerOptions options) {
        throw new NotImplementedException();
    }
}