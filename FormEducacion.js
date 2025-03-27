// src/components/FormEducacion.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { addEducation } from '../api/EducacionApi'; // Suponiendo que esta es tu función para enviar datos al backend

const FormEducacion = ({ userId }) => {
  // Usamos el hook useForm para gestionar el formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Función que maneja el submit del formulario
  const onSubmit = async (data) => {
    try {
      // Aquí puedes llamar a tu API para guardar los datos
      const response = await addEducation(userId, data);
      console.log(response); // Puedes manejar la respuesta de la API aquí, por ejemplo mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al guardar la educación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="institution">Institución</label>
        <input
          id="institution"
          name="institution"
          {...register("institution", { required: "Institución es requerida" })}
          placeholder="Institución"
        />
        {errors.institution && <span style={styles.error}>{errors.institution.message}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="degree">Título</label>
        <input
          id="degree"
          name="degree"
          {...register("degree", { required: "Título es requerido" })}
          placeholder="Título"
        />
        {errors.degree && <span style={styles.error}>{errors.degree.message}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="startDate">Fecha de inicio</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          {...register("startDate", { required: "Fecha de inicio es requerida" })}
        />
        {errors.startDate && <span style={styles.error}>{errors.startDate.message}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="endDate">Fecha de fin</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          {...register("endDate", { required: "Fecha de fin es requerida" })}
        />
        {errors.endDate && <span style={styles.error}>{errors.endDate.message}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          {...register("description", { required: "Descripción es requerida" })}
          placeholder="Descripción"
        />
        {errors.description && <span style={styles.error}>{errors.description.message}</span>}
      </div>

      <button type="submit" style={styles.submitButton}>Guardar</button>
    </form>
  );
};

// Estilos para los elementos del formulario
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default FormEducacion;
