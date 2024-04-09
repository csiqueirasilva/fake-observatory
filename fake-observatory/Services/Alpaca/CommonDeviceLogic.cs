using FakeObservatory.Hubs;
using FakeObservatory.Model.Alpaca;
using Microsoft.AspNetCore.SignalR;

namespace FakeObservatory.Services.Impl;

public class CommonDeviceLogic(ConfigurationLogic cl) {

    private readonly ConfigurationLogic Cfg = cl;

    public async Task<ApiReturn> GetConnected(GetCommonDevice props) {

        ClientScopeLogic.Setup(props.ClientId, props.ClientTransactionId);

        var isConnected = false;

        var comm = Cfg.GetAscomCommunicatorById(props.DeviceType, props.DeviceId);

        if(comm != null) {
            isConnected = await comm.GetIsConnected();
        }

        var response = new ApiReturn(isConnected);

        return response;
    }

    public async Task<ApiReturn> SetConnected(PutCommonDeviceConnected props) {

        ClientScopeLogic.Setup(props.ClientId, props.ClientTransactionId);

        var success = false;

        var comm = Cfg.GetAscomCommunicatorById(props.DeviceType, props.DeviceId);

        if(comm != null) {
            success = await comm.SetConnected(props.Connected);
        }

        var response = new ApiReturn (success ? ApiReturnCode.SUCCESS : ApiReturnCode.GENERIC_ERROR, $"Error while setting connected state {props.Connected} to {props.DeviceType} #{props.DeviceId}", success);
        
        return response;
    }
    
}