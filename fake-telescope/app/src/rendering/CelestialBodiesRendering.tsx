import CelestialBodies from "./CelestialBodies";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Celestron102Camera from "../context/Celestron102/Celestron102Camera";
import { Html, OrbitControls, OrbitControlsProps, PerspectiveCamera, Plane, useHelper } from "@react-three/drei";
import Axes from "./Axes";
import { Color, DoubleSide, Euler, PerspectiveCamera as ThreePerspectiveCamera, PerspectiveCamera as ThreeCamera, Vector3, CameraHelper } from "three";
import { DEGREE, RADIAN } from "../logic/Calculations";
import { useEffect, useRef, useState } from "react";
import useGenericContext from "../context/useGenericContext";
import { createPortal } from "react-dom";

const CelestialBodiesRendering = () => {
    const { fov, MIN_FOV, orbitCam, setOrbitCam } = useGenericContext();
    const cameraRef = useRef<any>(null);

    useEffect(() => {
        if(cameraRef.current) {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.fov = MIN_FOV + (fov * DEGREE);
            cameraRef.current.far = 1E8;
            cameraRef.current.near = 1E-8;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [ cameraRef.current, fov, MIN_FOV ]);

    useEffect(() => {
        if(cameraHelper.current) {
            if(orbitCam) {
                cameraHelper.current.visible = true;
            } else {
                cameraHelper.current.visible = false;
            }
        }
    }, [ orbitCam ]);

    const cameraHelper = useHelper(cameraRef, CameraHelper);

    useThree();

    return (
        <>
            {
                <Html>
                    {
                        createPortal(
                        <div style={{ position: "absolute", top: 10, left: 10 }}>
                            <button onClick={() => setOrbitCam(!orbitCam)}>View { orbitCam ? "Scope" : "Orbit" }</button>
                        </div>
                        , document.body)
                    }
                </Html>
            }
            { orbitCam && <OrbitControls /> }
            <PerspectiveCamera name="scope-camera" ref={cameraRef} makeDefault={!orbitCam} />
            <CelestialBodies />
            { cameraRef.current && <Celestron102Camera camera={cameraRef.current} /> }
            { 
                orbitCam && 
                <>
                    <Plane rotation={new Euler(90 * RADIAN, 0, 0)} scale={new Vector3(1E5, 1E5, 1)}>
                        <meshBasicMaterial transparent={true} opacity={0.05} color={Color.NAMES.tomato} side={DoubleSide} />
                    </Plane>
                    <Axes />
                </>
            }
        </>
    );
};

export default CelestialBodiesRendering;