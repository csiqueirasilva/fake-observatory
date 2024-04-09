using System.ComponentModel.DataAnnotations;
using FakeObservatory.Services;
using Microsoft.AspNetCore.Mvc;

namespace FakeObservatory.Model.Alpaca;

public class GetClientDetails {
    
    [FromQuery(Name = "ClientID"), Range(1, ConfigurationLogic.MAX_INT)] 
    public uint ClientId { get; set; } = 0;
    
    [FromQuery(Name = "ClientTransactionID"), Range(1, ConfigurationLogic.MAX_INT)] 
    public uint ClientTransactionId { get; set; } = 0;

}