using System.ComponentModel.DataAnnotations;
using FakeObservatory.Services;
using FakeObservatory.Tools;
using Microsoft.AspNetCore.Mvc;

namespace FakeObservatory.Model.Alpaca;

public class PutCommonDeviceConnected : PutCommonDevice {

    [FromForm(Name = "Connected"), Required] 
    public bool Connected { get; set; } 
    
}