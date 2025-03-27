// src/pages/views/Educacion.js
import React from "react";
import { useNavigate } from "react-router-dom";
import FormEducacion from '../../components/FormEducacion';
import { useForm } from 'react-hook-form'; // Si estás usando este hook en algún momento en el archivo
import { useRef } from 'react'; // Si tienes algún uso de useRef

const Educacion = () => {
  const navigate = useNavigate();
  const userId = 'ID_DEL_USUARIO'; // Este valor debe venir de algún estado global o contexto

  return (
    <div style={styles.container}>
      <h2>Editar Educación</h2>
      <h1>Mi Educación</h1>
      {/* Aquí llamamos al componente FormEducacion pasándole el userId */}
      <FormEducacion userId={userId} />
      <button onClick={() => navigate("/home")} style={styles.button}>
        Regresar
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff9800",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Educacion;
