import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import Axes from './Axes';
import CelestialBodies from './CelestialBodies';

const SimpleBox: React.FC = () => {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState<boolean>(false);
    const [clicked, setClick] = useState<boolean>(false);

    return (
        <Canvas>
            <OrbitControls />
            <Axes />
            <CelestialBodies />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box
                ref={meshRef}
                args={[1, 1, 1]} // Box size: 1x1x1
                onClick={() => setClick(!clicked)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={clicked ? 1.5 : 1}
                rotation={hovered ? [Math.PI / 2, Math.PI / 2, 0] : [0, 0, 0]}
            >
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </Box>
        </Canvas>
    );
};

export default SimpleBox;