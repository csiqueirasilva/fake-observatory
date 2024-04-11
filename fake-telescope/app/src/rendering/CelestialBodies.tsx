import CelestialBody from "./CelestialBody";
import { Body } from "astronomy-engine";

// Component to add axes helper
const CelestialBodies = () => {
    return (
        <>
            <CelestialBody body={Body.Sun} />
            <CelestialBody body={Body.Moon} />
        </>
    );
};

export default CelestialBodies;