using FakeObservatory.Model.Alpaca;

namespace FakeObservatory.Model;

public class Device {
    public uint Id { get; set; }
    public string Name { get; set; }
    public DeviceType Type { get; set; }
}