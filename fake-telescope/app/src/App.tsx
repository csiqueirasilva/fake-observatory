import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleBox from './rendering/SimpleBox';
import CelestialBodiesRendering from './rendering/CelestialBodiesRendering';

function App() {
  return (
    <div className="App">
      <CelestialBodiesRendering />
    </div>
  );
}

export default App;
