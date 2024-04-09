using FakeObservatory.Tools;

namespace FakeObservatory.Services;

public class ClientScopeLogic() {

    private static uint CounterServerTransactionId = 0;

    private static readonly AsyncLocal<uint> _clientId = new();
    private static readonly AsyncLocal<uint> _clientTransactionId = new();
    private static readonly AsyncLocal<uint> _serverTransactionId = new();

    public static uint ClientId {
        get => _clientId.Value;
        private set => _clientId.Value = value;
    }

    public static uint ClientTransactionId {
        get => _clientTransactionId.Value;
        private set => _clientTransactionId.Value = value;
    }

    public static uint ServerTransactionId {
        get => _serverTransactionId.Value;
        private set => _serverTransactionId.Value = value;
    }

    public static void Setup(uint? clientId, uint? clientTransactionId) {
        ClientId = clientId ?? 0;
        ClientTransactionId = clientTransactionId ?? 0;
        if(ClientId < 0 && ClientId > ConfigurationLogic.MAX_INT) {
            throw new ClientException("ClientID out of range");
        }
        if(ClientTransactionId < 0 && ClientTransactionId > ConfigurationLogic.MAX_INT) {
            throw new ClientException("ClientTransactionID out of range");
        }
        ServerTransactionId = Interlocked.Increment(ref CounterServerTransactionId);
    }

}