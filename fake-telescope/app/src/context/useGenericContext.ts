import { useState } from "react";
import { useCelestron102Context } from "./Celestron102/Celestron102Context";
import { Body } from "astronomy-engine";

export interface GenericContext {
    fov : number;
    setFov : (fov : number) => void; 
    latitude : number;
    setLatitude : (fov : number) => void; 
    longitude : number;
    setLongitude : (fov : number) => void; 
    MAX_FOV: number;
    MIN_FOV: number;
    orbitCam: boolean;
    setOrbitCam: (oc : boolean) => void;
}

function useGenericContext() {
    const objectList = [ Body.Sun, Body.Mercury, Body.Venus, Body.Moon, Body.Mars, Body.Jupiter, Body.Saturn, Body.Uranus, Body.Neptune, Body.Pluto, Body.Star1, Body.Star2, Body.Star3 ];
    const DEBUG = (process.env.REACT_APP_DEBUG === "true") || false;
    const context = useCelestron102Context();
    return { ...context, DEBUG, objectList };
}

export default useGenericContext;