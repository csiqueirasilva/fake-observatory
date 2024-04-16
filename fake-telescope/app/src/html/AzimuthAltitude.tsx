import { DEGREE } from "../logic/Calculations";
import { formatDegreesAsDMS } from "../logic/Format";
import SphericalCoordinates from "../model/SphericalCoordinates";

function AzimuthAltitude ({ coords } : { coords : SphericalCoordinates }) {
    return (
        <>
            <div className={"three-html-label"}>AZ { formatDegreesAsDMS(coords.azimuth * DEGREE) }</div>
            <div className={"three-html-label"}>AL { formatDegreesAsDMS(coords.altitude * DEGREE, false) }</div>
        </>
    );
}

export default AzimuthAltitude;