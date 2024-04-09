namespace FakeObservatory.Services;

public interface IAscomCommunicator {
    Task<bool> GetIsConnected();
    Task<bool> SetConnected(bool connected);
}