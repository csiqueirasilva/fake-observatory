using System.Reflection.Metadata.Ecma335;
using FakeObservatory.Model;
using FakeObservatory.Model.Alpaca;
using FakeObservatory.Services.Impl;

namespace FakeObservatory.Services;

public class ConfigurationLogic(IConfiguration cfg, FakeTelescopeLogic ftl) {

    public const uint MAX_INT = 4294967295;

    private readonly FakeTelescopeLogic FakeTelescopeLogic = ftl;
    private readonly IConfiguration Configuration = cfg;

    public IAscomCommunicator GetAscomCommunicatorById(DeviceType deviceType, uint id) {
        IAscomCommunicator ret = null;
        var arr = Configuration.GetSection("Devices").Get<Device[]>();
        var telescope = arr.FirstOrDefault(x => x.Id == id);
        ret = GetByDevice(telescope);
        return ret;
    }

    private const uint FakeTelescopeId = 1;

    private IAscomCommunicator GetByDevice(Device device) {
        IAscomCommunicator ret = null;
        if(device != null) {
            if(device.Type == DeviceType.TELESCOPE) {
                switch(device.Id) {
                    case FakeTelescopeId:
                        ret = FakeTelescopeLogic;
                    break;
                }
            }
        }
        return ret;
    }

}