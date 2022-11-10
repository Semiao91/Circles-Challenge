import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [circle, setCircle] = useState([]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const circleImg = <span className="dot" style={{ left: coords.x, top: coords.y }} />

  useEffect(() => {
    // get global mouse coordinates
    console.log(circle)
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const handleMouseMove = event => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  function createCircle() {
    setCircle(circle => [...circle, circleImg])
  }

  function eraseCircles() {
    setCircle([])
  }

  function undoLastCircle() {
    setCircle((circle) => (circle.slice(0, -1)));
  }

  return (
    <div>
        <button onClick={undoLastCircle}>Undo</button>
        <button onClick={eraseCircles}>Reset</button>
      <div className='App-header' onMouseMove={handleMouseMove} onClick={createCircle}>
        {circle}
        <h2> Coords: x {coords.x} y {coords.y}</h2>
      </div>
    </div>
  );
}

export default App;
