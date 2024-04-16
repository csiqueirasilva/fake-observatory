import { useEffect, useState } from "react";
import { Vector2, Vector3 } from "three";
import { Body } from 'astronomy-engine';
import { Html, Sphere } from "@react-three/drei";
import { cartesianToHorizontal, getBodyCartesianCoords, getBodyColor, getBodyDistance, getBodyHorizontalCoords, getBodyName, getBodyRadius, RADIAN, sphericalToCartesian } from "../logic/Calculations";
import { formatDegreesAsDMS } from "../logic/Format";
import useGenericContext from "../context/useGenericContext";
import AzimuthAltitude from "../html/AzimuthAltitude";
import SphericalCoordinates from "../model/SphericalCoordinates";

interface Props {
    body: Body
}

const CelestialBody = ({ body }: Props) => {
    const [ position, setPosition ] = useState(new Vector3());
    const [ hCoords, setHCoords ] = useState<SphericalCoordinates>({ azimuth: 0, altitude: 0 });
    const color = getBodyColor(body);
    const [ visible, setVisible ] = useState(false);
    const name = getBodyName(body);
    const radius = getBodyRadius(body) / 5e5;
    const { latitude, longitude } = useGenericContext();

    useEffect(() => {
        let v = position.length() !== 0;
        setVisible(v);
    }, [ position ]);

    useEffect(() => {
        let interval = setInterval(() => {
            let hCoords = getBodyHorizontalCoords(body, latitude, longitude);
            setHCoords({ altitude: hCoords.altitude * RADIAN, azimuth: hCoords.azimuth * RADIAN });
            let coords = getBodyCartesianCoords(body, latitude, longitude);
            let direction = coords.normalize();
            let distance = getBodyDistance(body);
            setPosition(direction.multiplyScalar(distance));
        }, 5);
        return () => clearInterval(interval);
    }, []);

    return (
        <Sphere args={[ radius, 64, 64 ]} position={position} visible={visible}>
            <meshBasicMaterial color={color} />
            {
                visible && 
                <Html>
                    <div className={"three-html-label"}>{ name }</div>
                    <AzimuthAltitude coords={hCoords} />
                </Html>
            }
        </Sphere>
    );
};

export default CelestialBody;