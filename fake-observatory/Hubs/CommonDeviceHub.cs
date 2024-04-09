using FakeObservatory.Model.Alpaca;
using FakeObservatory.Services.Impl;
using Microsoft.AspNetCore.SignalR;

namespace FakeObservatory.Hubs;

public class CommonDeviceHub(CommonDeviceLogic cdl) : Hub {

    private readonly CommonDeviceLogic Logic = cdl;

    // alpaca mirror

    public async Task GetConnected(GetCommonDevice props) {
        var resp = await Logic.GetConnected(props);
        await Clients.Caller.SendAsync("GetConnectedResponse", resp);
    }

    public async Task SetConnected(PutCommonDeviceConnected props) {
        var resp = await Logic.SetConnected(props);
        await Clients.Caller.SendAsync("SetConnectedResponse", resp);
    }

    // end of alpaca mirror

}