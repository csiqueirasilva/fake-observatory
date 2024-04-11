import { useEffect, useState } from "react";
import { Color, Vector2, Vector3 } from "three";
import { Body } from 'astronomy-engine';
import { Html, Sphere } from "@react-three/drei";
import { getBodyCartesianCoords, getBodyHorizontalCoords } from "../logic/Calculations";

interface Props {
    body: Body
}

const CelestialBody = ({ body }: Props) => {
    const [ position, setPosition ] = useState(new Vector3());
    const [ hCoords, setHCoords ] = useState(new Vector2());
    const [ color, setColor ] = useState(new Color(Math.random(), Math.random(), Math.random()));

    useEffect(() => {
        let interval = setInterval(() => {
            let hCoords = getBodyHorizontalCoords(body);
            setHCoords(new Vector2(hCoords.altitude, hCoords.azimuth));
            let coords = getBodyCartesianCoords(body);
            setPosition(coords);
        }, 50);
        return () => clearInterval(interval);
    })

    return (
        <Sphere position={position}>
            <meshBasicMaterial color={color} />
            <Html>
                <div style={{ width: '200px' }}>{ body } (AL { hCoords.x.toFixed(2) }, AZ { hCoords.y.toFixed(2) })</div>
            </Html>
        </Sphere>
    );
};

export default CelestialBody;