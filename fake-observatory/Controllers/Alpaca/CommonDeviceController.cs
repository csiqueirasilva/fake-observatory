using System.ComponentModel.DataAnnotations;
using FakeObservatory.Model.Alpaca;
using FakeObservatory.Services;
using FakeObservatory.Services.Impl;
using FakeObservatory.Tools;
using Microsoft.AspNetCore.Mvc;

namespace FakeObservatory.Controllers.Alpaca;

[ApiController]
[Route("api")]
public class CommonDeviceController(CommonDeviceLogic cl) : ControllerBase {

    private readonly CommonDeviceLogic Logic = cl;

    [HttpGet("{deviceType}/{deviceId}/connected")]
    public async Task<IActionResult> GetConnected(GetCommonDevice props) => Ok(await Logic.GetConnected(props));

    [HttpPut("{deviceType}/{deviceId}/connected")]
    public async Task<IActionResult> SetConnected(PutCommonDeviceConnected props) => Ok(await Logic.SetConnected(props));

}