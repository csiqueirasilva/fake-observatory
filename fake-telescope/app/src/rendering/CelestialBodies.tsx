import useGenericContext from "../context/useGenericContext";
import CelestialBody from "./CelestialBody";

const CelestialBodies = () => {
    const { objectList } = useGenericContext();
    return (
        <>
            {
                objectList.map((b, k) => <CelestialBody body={b} key={k} />)
            }
        </>
    );
};

export default CelestialBodies;