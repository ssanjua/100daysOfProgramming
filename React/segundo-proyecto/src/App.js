import './App.css';
import freeCodeCampLogo from './imagenes/freecodecamp-logo.png';
import Boton from './componentes/Boton';
import Contador from './componentes/Contador';
import { useState } from 'react';


function App() {

  const [ numClics, setNumClics ] = useState(0);

  const handleClick = () => {
    setNumClics(numClics + 1)
  }

  const handleReset = () => {
    setNumClics(0)
  }

  return (
    <div className="App">
      <div className='freecodecamp-logo-contenedor'>
        <img
          className='freecodecamp-logo'
          src={freeCodeCampLogo}
          alt='Logo de freeCodeCamp'  
        />
      </div>
      <div className='contenedor-principal'>
        <Contador numClicks={numClics} />
        <Boton
          texto='click'
          isButton={true}
          handleClick={handleClick}
        />
        <Boton
          texto='reiniciar'
          isButton={false}
          handleClick={handleReset}
        />
      </div>  
    </div>
  );
}

export default App;
