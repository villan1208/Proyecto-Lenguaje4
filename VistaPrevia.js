// src/pages/views/VistaPrevia.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/VistaPrevia.css";

// ✅ IMPORTACIONES DEFAULT (sin llaves)
import PreviewUsuario from "../../components/preview/PreviewUsuario"; // nuevo nombre
import PreviewHabilidades from "../../components/preview/PreviewHabilidades";
import PreviewExperiencia from "../../components/preview/PreviewExperiencia";
import PreviewProyectos from "../../components/preview/PreviewProyectos";
import PreviewContactos from "../../components/preview/PreviewContactos";
import PreviewReferencias from "../../components/preview/PreviewReferencias";
import PreviewEducacion from "../../components/preview/PreviewEducacion";
import PreviewIdiomas from "../../components/preview/PreviewIdiomas";



const VistaPrevia = () => {
  const navigate = useNavigate();

  return (
    <div className="vista-previa-container">
      <h1 className="vista-previa-title">Vista Previa del Portafolio</h1>

      <div className="vista-previa-section">
           <PreviewUsuario />
       </div>

      <div className="vista-previa-section">
        <PreviewExperiencia />
      </div>

      <div className="vista-previa-section">
        <PreviewHabilidades />
      </div>

      <div className="vista-previa-section">
        <PreviewProyectos />
      </div>

      <div className="vista-previa-section">
         <PreviewContactos />
      </div>


     <div className="vista-previa-section">
         <PreviewReferencias />
      </div>

       

      
      <div className="vista-previa-section">
          <PreviewEducacion />
       </div>


    <div className="vista-previa-section">
      <PreviewIdiomas />
      </div>


      <button onClick={() => navigate("/home")} className="vista-previa-btn">
        Regresar
      </button>
    </div>
  );
};

export default VistaPrevia;










































