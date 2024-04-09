namespace FakeObservatory.Model.Astronomy;

public class HorizontalCoordinates
{
    public double Azimuth { get; set; }
    public double Altitude { get; set; }
    public double Ra { get; set; }
    public double Dec { get; set; }

    // Default constructor
    public HorizontalCoordinates() { }

    // Constructor that takes a Topocentric struct
    public HorizontalCoordinates(CosineKitty.Topocentric topo)
    {
        Azimuth = topo.azimuth;
        Altitude = topo.altitude;
        Ra = topo.ra;
        Dec = topo.dec;
    }
}