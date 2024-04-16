import { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { ArrowHelper, Euler, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { cartesianToHorizontal, cartesianToSpherical, DEGREE, getBodyCartesianCoords, getBodyHorizontalCoords, getBodyName, getCameraForwardVector, RADIAN, sphericalToCartesian } from '../../logic/Calculations';
import { useCelestron102Context } from './Celestron102Context';
import { Html, Sphere, useCamera } from '@react-three/drei';
import { createPortal } from 'react-dom';
import { Body } from 'astronomy-engine';
import { formatDegreesAsDMS } from '../../logic/Format';
import useGenericContext from '../useGenericContext';
import SphericalCoordinates from '../../model/SphericalCoordinates';
import AzimuthAltitude from '../../html/AzimuthAltitude';
import AbsoluteBox from '../../html/AbsoluteBox';

const Celestron102Camera = ({ camera } : { camera : PerspectiveCamera}) => {

    const { fov, setFov, MAX_FOV, MIN_FOV, latitude, longitude, orbitCam, objectList } = useGenericContext();
    const [ cameraPointingSpherical, setCameraPointingSpherical ] = useState<SphericalCoordinates>({ azimuth: 0, altitude: 0 });
    const arrowRef = useRef<ArrowHelper>(null);
    const distFov = MAX_FOV - MIN_FOV;
    const [ debugPoint, setDebugPoint ] = useState(new Vector3(0, 0, 0));
    const [ bodyValue, setBodyValue ] = useState<Body|"">("");
    const noBodySelected = new Vector3(1, 0, 0);

    useFrame(() => {
        let coords = noBodySelected;
        if(bodyValue !== "") {
            let b : Body = bodyValue;
            let hCoords = getBodyHorizontalCoords(b, latitude, longitude);
            setCameraPointingSpherical({ altitude: hCoords.altitude * RADIAN, azimuth: hCoords.azimuth * RADIAN });
            coords = sphericalToCartesian(hCoords.azimuth, hCoords.altitude, 1);
        } else {
            setCameraPointingSpherical(cartesianToHorizontal(coords.x, coords.y, coords.z));
        }
        if (camera) {
            camera.lookAt(coords);
            camera.rotation.z += latitude * RADIAN;
        } 
        if(orbitCam && arrowRef.current) {
            let c2 = coords.clone();
            let norm = c2.normalize();
            arrowRef.current.setDirection(norm);
            setDebugPoint(norm);
        }
    });
    
    const handleZoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFov = parseFloat(event.target.value);
        setFov(newFov * RADIAN);
    };

    return (
        <>
            {
                orbitCam &&
                <object3D>
                    <arrowHelper ref={arrowRef} visible={orbitCam} />
                    <object3D position={debugPoint}>
                        <Html>
                            <AzimuthAltitude coords={cameraPointingSpherical} />
                        </Html>
                    </object3D>
                </object3D>
            }
            <AbsoluteBox top={4} right={4}>
                <label htmlFor="zoom" className='three-html-label'>FOV { (MIN_FOV + (fov * DEGREE)).toFixed(3) }: </label>
                <input 
                    style={{ height: '0.9vh', marginBottom: 10 }}
                    type="range" 
                    id="zoom" 
                    name="zoom"
                    min={0}
                    max={distFov}
                    step="0.001"
                    value={fov * DEGREE}
                    onChange={handleZoom} />
                <AzimuthAltitude coords={cameraPointingSpherical} />
                <select value={bodyValue} onChange={(ev) => setBodyValue(ev.target.value as Body|"")}>
                    <option value={""}>Pick a body...</option>
                    {
                        objectList.map((body, key) => <option key={key} value={body}>{ getBodyName(body) }</option>)
                    }
                </select>
            </AbsoluteBox>
        </>
    );
};

export default Celestron102Camera;