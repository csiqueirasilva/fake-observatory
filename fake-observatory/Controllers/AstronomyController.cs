using System.ComponentModel.DataAnnotations;
using CosineKitty;
using FakeObservatory.Model.Alpaca;
using FakeObservatory.Model.Astronomy;
using FakeObservatory.Services;
using FakeObservatory.Services.Impl;
using FakeObservatory.Tools;
using Microsoft.AspNetCore.Mvc;

namespace FakeObservatory.Controllers;

[ApiController]
[Route("[controller]")]
public class AstronomyController() : ControllerBase {

    private static double ToPostJ2000(DateTime? date = null) {
        if(date == null) {
            date = DateTime.Now;
        }
        // J2000 start date
        DateTime j2000 = new DateTime(2000, 1, 1, 12, 0, 0, DateTimeKind.Utc);
        // Calculate the difference in days including the fraction of the day
        double days = (((DateTime) date).ToUniversalTime() - j2000).TotalDays;
        return days;
    }

    private static AstroTime GetAstroTime(DateTime? date = null) {
        var postJ2000days = ToPostJ2000(date);
        return AstroTime.FromTerrestrialTime(postJ2000days);
    }

    [HttpGet("coordinates/{body}")]
    public IActionResult GetBodyHorizontalCoords([FromRoute, Required] Body body, [FromQuery] double latitude = -22.975924853881732, [FromQuery] double longitude = -43.23159663917491, [FromQuery] double height = 0) {
        AstroTime time = GetAstroTime();
        Observer observer = new Observer(latitude, longitude, height);
        Equatorial objEqu = Astronomy.Equator(body, time, observer, EquatorEpoch.OfDate, Aberration.None);
        Topocentric topoHorizon = Astronomy.Horizon(time, observer, objEqu.ra, objEqu.dec, Refraction.None);
        return Ok(new HorizontalCoordinates(topoHorizon));
    }

}