import { OrbitControls } from "@react-three/drei";
import CelestialBodies from "./CelestialBodies";
import { Canvas } from "@react-three/fiber";

const CelestialBodiesRendering = () => {
    return (
        <Canvas>
            <OrbitControls/>
            <CelestialBodies />
        </Canvas>
    );
};

export default CelestialBodiesRendering;