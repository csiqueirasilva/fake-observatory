import { createContext, ReactNode, useContext, useState } from "react";
import { DEGREE, RADIAN } from "../../logic/Calculations";
import { GenericContext } from "../useGenericContext";

export interface ICelestron102Context extends GenericContext {
}

export function Celestron102Provider({ children } : { children : ReactNode }) {
    const [ fov, setFov ] = useState(0.048 * RADIAN);
    const [ latitude, setLatitude ] = useState(-22.975924853881732);
    const [ longitude, setLongitude ] = useState(-43.23159663917491);
    const [ orbitCam, setOrbitCam ] = useState(false);

    const o : ICelestron102Context = {
        fov, setFov,
        latitude, setLatitude,
        longitude, setLongitude,
        MAX_FOV: 0.52, MIN_FOV: 0.052,
        orbitCam, setOrbitCam
    };

    return (
        <Celestron102Context.Provider value={o}>
            {children}
        </Celestron102Context.Provider>
    );
}

export const useCelestron102Context = () => {
    const context = useContext(Celestron102Context);
    if (context === undefined) {
        throw new Error('useCelestron102Context must be used within a Celestron102Provider');
    }
    return context;
};

const Celestron102Context = createContext<ICelestron102Context | undefined>(undefined);

export default Celestron102Context;