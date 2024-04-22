import React from "react";
import "../styles/Testimonios.css";

function Testimonio(props) {
  return (
    <div className="container-testimonio">
      <img 
        className="imagen-testimonio" 
        src={require(`../imagenes/${props.nombre}.png`)}
        alt={`imagen de ${props.nombre}`} 
      />
      <div className="contenedor-texto-testimonio">
        <p className="nombre-testimonio"><strong>{props.nombre}</strong> en {props.pais}</p>
        <p className="cargo-testimonio">{props.cargo} en <strong>{props.empresa}</strong></p>
        <p className="descripcion-testimonio">"{props.testimonio}"</p>
      </div>
    </div>
  )
}  

export default Testimonio;