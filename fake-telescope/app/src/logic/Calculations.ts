import { Body, Equator, Horizon, MakeTime, Observer } from 'astronomy-engine';
import { Vector3 } from 'three';

function getAstroTime(date = new Date()) {
    return MakeTime(date);
}

export function getBodyHorizontalCoords(body: Body, latitude = -22.975924853881732, longitude = -43.23159663917491, height = 0) {
    const time = getAstroTime();
    const observer = new Observer(latitude, longitude, height);
    const equatorial = Equator(body, time, observer, false, false);
    const horizontal = Horizon(time, observer, equatorial.ra, equatorial.dec, 'normal');

    return {
        azimuth: horizontal.azimuth,
        altitude: horizontal.altitude
    };
}

const sphericalToCartesian = (azimuth: number, altitude: number, distance = 100) => {
    const phi = (90 - altitude) * (Math.PI / 180);
    const theta = azimuth * (Math.PI / 180);
    return new Vector3(
        distance * Math.sin(phi) * Math.cos(theta),
        distance * Math.cos(phi),
        distance * Math.sin(phi) * Math.sin(theta)
    );
};

export function getBodyCartesianCoords(body: Body, latitude = -22.975924853881732, longitude = -43.23159663917491, height = 0) {
    let pos = getBodyHorizontalCoords(body, latitude, longitude, height);
    return sphericalToCartesian(pos.azimuth, pos.altitude);
}