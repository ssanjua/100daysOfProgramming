import React from 'react';
import '../styles/Boton.css'

function Boton({ texto, isButton , handleClick }) {
  return (
    <button
      className={ isButton ? 'boton-click' : 'boton-reiniciar' }
      onClick={ handleClick }
  >
        {texto}
    </button>
  )
}

export default Boton;