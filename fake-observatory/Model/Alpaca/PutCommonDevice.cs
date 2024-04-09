using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FakeObservatory.Services;
using FakeObservatory.Tools;
using Microsoft.AspNetCore.Mvc;

namespace FakeObservatory.Model.Alpaca;

public class PutCommonDevice : PutClientDetails {

    [FromRoute(Name = "deviceType"), ModelBinder(BinderType = typeof(EnumDeviceConverter)), JsonConverter(typeof(EnumDeviceConverter))] 
    public DeviceType DeviceType { get; set; } 

    [FromRoute(Name = "deviceId"), Range(0, ConfigurationLogic.MAX_INT)] 
    public uint DeviceId { get; set; }
    
}