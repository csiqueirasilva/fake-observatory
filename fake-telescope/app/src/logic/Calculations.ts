import { Body, DefineStar, Equator, Horizon, MakeTime, Observer } from 'astronomy-engine';
import { Color, PerspectiveCamera, Vector3 } from 'three';
import SphericalCoordinates from '../model/SphericalCoordinates';

function raToDecimalHours(hours : number, minutes : number, seconds : number) {
    return hours + minutes / 60 + seconds / 3600;
}

function decToDecimalDegrees(degrees : number, minutes : number, seconds : number) {
    const sign = degrees < 0 ? -1 : 1;
    return degrees + sign * (minutes / 60 + seconds / 3600);
}

// Proxima Centauri
DefineStar(Body.Star1, raToDecimalHours(14, 29, 42.9487), decToDecimalDegrees(-62, 40, 46.141), 4.24);
// Alpha Centauri A
DefineStar(Body.Star2, raToDecimalHours(14, 39, 36.49400), decToDecimalDegrees(-60, 50, 2.3737), 4.37);
// Alpha Centauri B
DefineStar(Body.Star3, raToDecimalHours(14, 39, 35.06311), decToDecimalDegrees(-60, 50, 15.0992), 4.37);

function getAstroTime(date = new Date()) {
    return MakeTime(date);
}

export function getBodyHorizontalCoords(body: Body, latitude = -22.975924853881732, longitude = -43.23159663917491, height = 0) : SphericalCoordinates {
    const time = getAstroTime();
    const observer = new Observer(latitude, longitude, height);
    const equatorial = Equator(body, time, observer, true, false);
    const horizontal = Horizon(time, observer, equatorial.ra, equatorial.dec, 'normal');

    return {
        azimuth: horizontal.azimuth,
        altitude: horizontal.altitude
    };
}

export function getCameraForwardVector(camera : PerspectiveCamera) {
    // The local forward vector is (0, 0, -1) for a camera in Three.js
    var forward = new Vector3(0, 0, -1);
    // Apply the camera's current rotation to the forward vector
    forward.applyQuaternion(camera.quaternion);

    return forward;
}

export const sphericalToCartesian = (azimuth: number, altitude: number, distance = 100) => {
    const phi = (90 - altitude) * RADIAN;
    const theta = azimuth * RADIAN;
    return new Vector3(
        distance * Math.sin(phi) * Math.cos(theta),
        distance * Math.cos(phi),
        distance * Math.sin(phi) * Math.sin(theta)
    );
};

export function cartesianToHorizontal(x : number, y : number, z : number) : SphericalCoordinates {
    const r = Math.sqrt(x * x + y * y + z * z);
    const azimuthRad = Math.atan2(x, y); // Assuming azimuth is from North towards East
    const altitudeRad = Math.asin(z / r);

    return {
        distance: r,
        azimuth: azimuthRad, 
        altitude: altitudeRad
    };
}

export const cartesianToSpherical = (x : number, y : number, z : number) : SphericalCoordinates => {
    const r = Math.sqrt(x * x + y * y + z * z); // Distance from origin
    const theta = Math.atan2(y, x); // Azimuth angle in radians
    const phi = Math.atan2(Math.sqrt(x * x + y * y), z); // Altitude angle in radians

    return {
        distance: r,
        azimuth: theta,
        altitude: (Math.PI / 2) - phi 
    };
};

export function getBodyCartesianCoords(body: Body, latitude = -22.975924853881732, longitude = -43.23159663917491, height = 0) {
    let pos = getBodyHorizontalCoords(body, latitude, longitude, height);
    return sphericalToCartesian(pos.azimuth, pos.altitude);
}

export function getBodyName(body: Body): string {
    const names = {
        [Body.Sun]: 'Sun',
        [Body.Moon]: 'Moon',
        [Body.Mercury]: 'Mercury',
        [Body.Venus]: 'Venus',
        [Body.Earth]: 'Earth',
        [Body.Mars]: 'Mars',
        [Body.Jupiter]: 'Jupiter',
        [Body.Saturn]: 'Saturn',
        [Body.Uranus]: 'Uranus',
        [Body.Neptune]: 'Neptune',
        [Body.Pluto]: 'Pluto',
        [Body.SSB]: 'Solar System Barycenter',
        [Body.EMB]: 'Earth/Moon Barycenter',
        [Body.Star1]: 'Proxima Centauri',
        [Body.Star2]: 'Alpha Centauri',
        [Body.Star3]: 'Alpha Centauri B'
    } as { [key in Body]: string };
    return names[body] || 'Unknown Body';
}

export function getBodyRadius(body: Body): number {
    const radii = {
        [Body.Sun]: 1800, 
        [Body.Moon]: 1800,
        [Body.Mercury]: 300,
        [Body.Venus]: 600,
        [Body.Mars]: 400,
        [Body.Jupiter]: 1000,
        [Body.Saturn]: 800,
        [Body.Uranus]: 700,
        [Body.Neptune]: 700,
        [Body.Pluto]: 1,
        [Body.Star1]: 695700,   // Proxima Centauri, approximated to a similar star
        [Body.Star2]: 834840,   // Alpha Centauri A, estimated
        [Body.Star3]: 602170    // Alpha Centauri B, estimated
    } as { [key in Body]: number };

    return radii[body];
}

export function getBodyDistance(body: Body): number {
    const distances = {
        [Body.Sun]: 10, 
        [Body.Moon]: 10,
        [Body.Mercury]: 10,
        [Body.Venus]: 10,
        [Body.Mars]: 10,
        [Body.Jupiter]: 10,
        [Body.Saturn]: 10,
        [Body.Uranus]: 10,
        [Body.Neptune]: 10,
        [Body.Pluto]: 10,
        [Body.Star1]: 63241.1 * 4,   
        [Body.Star2]: 63241.1 * 4,   
        [Body.Star3]: 63241.1 * 4    
    } as { [key in Body]: number };

    return distances[body];
}

// Helper function to get the color of a celestial body
export function getBodyColor(body: Body): Color {
    const colors = {
        [Body.Sun]: new Color(0xFFFF00), // Yellow
        [Body.Moon]: new Color(0xAAAAAA), // Grey
        [Body.Mercury]: new Color(0xBBBBBB), // Light Grey
        [Body.Venus]: new Color(0xFFFFE0), // Whitish Yellow
        [Body.Earth]: new Color(0x0000FF), // Blue
        [Body.Mars]: new Color(0xFF4500), // Reddish
        [Body.Jupiter]: new Color(0xB8860B), // Brownish-Orange
        [Body.Saturn]: new Color(0xF4A460), // Sandy Brown
        [Body.Uranus]: new Color(0x708090), // Slate Grey
        [Body.Neptune]: new Color(0x4169E1), // Royal Blue
        [Body.Pluto]: new Color(0x964B00), // Brown
        [Body.SSB]: new Color(0xFFFFFF), // White
        [Body.EMB]: new Color(0xFFFFFF), // White
        [Body.Star1]: new Color(0xFF6347), // Reddish (Tomato color for Proxima Centauri)
        [Body.Star2]: new Color(0xFFFFE0), // Light Yellow (for Alpha Centauri A)
        [Body.Star3]: new Color(0xF0E68C), // Khaki (for Alpha Centauri B)
    } as { [key in Body]: Color };
    return colors[body] || new Color(0xFFFFFF); // Default white for any undefined body
}

export const RADIAN = (Math.PI / 180);
export const DEGREE = (180 / Math.PI);