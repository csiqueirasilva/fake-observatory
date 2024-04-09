namespace FakeObservatory.Services.Impl;

public class FakeTelescopeLogic() : IAscomCommunicator {

    private static bool Connected = false;

    private static Task Delay(int time) {
        return Task.Run(() => Thread.Sleep(time));
    }

    public async Task<bool> GetIsConnected() {
        await Delay((int) ((Random.Shared.NextDouble() + 0.5) * 100));
        return Connected;
    }

    public async Task<bool> SetConnected(bool connected) {
        await Delay((int) ((Random.Shared.NextDouble() + 0.5) * 500)); 
        Connected = connected;
        return true;
    }
    
}