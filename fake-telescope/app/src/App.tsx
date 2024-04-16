import './App.css';
import CelestialBodiesRendering from './rendering/CelestialBodiesRendering';
import { Celestron102Provider } from './context/Celestron102/Celestron102Context';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div className="App">
      <Canvas frameloop="demand" camera={{ position: [-2, 2, 5] }}>
        <Celestron102Provider>
          <CelestialBodiesRendering />
        </Celestron102Provider>
      </Canvas>
    </div>
  );

}

export default App;
