import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const ContactForm = ({ userId, socials, handleSaveSocials }) => {
  const initialValues = {
    linkedin: socials?.linkedin || "",
    github: socials?.github || "",
    twitter: socials?.twitter || "",
    facebook: socials?.facebook || "",
    instagram: socials?.instagram || "",
  };

  const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;

  const validationSchema = Yup.object({
    linkedin: Yup.string().matches(urlRegex, "URL no válida").nullable(),
    github: Yup.string().matches(urlRegex, "URL no válida").nullable(),
    twitter: Yup.string().matches(urlRegex, "URL no válida").nullable(),
    facebook: Yup.string().matches(urlRegex, "URL no válida").nullable(),
    instagram: Yup.string().matches(urlRegex, "URL no válida").nullable(),
  });

  const handleSubmit = async (values) => {
    if (!userId) {
      alert("No se ha detectado el usuario");
      console.error("❌ userId no disponible");
      return;
    }

    const cleaned = Object.fromEntries(
      Object.entries(values).map(([key, val]) => [key, val.trim()])
    );

    // Verifica si al menos una URL fue ingresada
    const hasAtLeastOne = Object.values(cleaned).some((v) => v !== "");
    if (!hasAtLeastOne) {
      alert("Por favor ingresa al menos una red social.");
      return;
    }

    try {
      await handleSaveSocials(cleaned);
    } catch (error) {
      console.error("❌ Error al guardar redes sociales:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="contact-form">
        {["linkedin", "github", "twitter", "facebook", "instagram"].map((field) => (
          <div key={field} style={{ marginBottom: "1rem" }}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <Field
              type="url"
              name={field}
              placeholder={`https://${field}.com/usuario`}
            />
            <ErrorMessage name={field} component="div" className="error" />
          </div>
        ))}

        <button type="submit">
          {socials ? "Actualizar Redes Sociales" : "Guardar Redes Sociales"}
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
