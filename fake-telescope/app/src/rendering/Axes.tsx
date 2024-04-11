import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { AxesHelper } from "three";

// Component to add axes helper
const Axes = () => {
    const { scene } = useThree();
    
    useEffect(() => {
      const axesHelper = new AxesHelper(5);
      scene.add(axesHelper);
      return () => { 
        scene.remove(axesHelper);
      };
    }, [scene]);

    return null;
};

export default Axes;