import React, { useState, useEffect } from "react";
import { createReference, updateReference } from "../api/referenceApi";

const ReferenceForm = ({ userId, reference, refreshReferences }) => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [testimony, setTestimony] = useState("");
  const [imageURL, setImageURL] = useState("");

  // ✅ Sincronizar estado con la referencia seleccionada
  useEffect(() => {
    if (reference) {
      setName(reference.name || "");
      setRelationship(reference.relationship || "");
      setTestimony(reference.testimony || "");
      setImageURL(reference.imageURL || "");
    } else {
      // ✅ Limpiar el formulario si no hay referencia
      setName("");
      setRelationship("");
      setTestimony("");
      setImageURL("");
    }
  }, [reference]);

  // ✅ Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("No se ha detectado el usuario");
      console.error("❌ userId no disponible");
      return;
    }

    if (!name || !relationship || !testimony) {
      alert("Todos los campos son obligatorios");
      console.error("❌ Campos requeridos faltantes");
      return;
    }

    const data = {
      name: name.trim(),
      relationship: relationship.trim(),
      testimony: testimony.trim(),
      imageURL: imageURL ? imageURL.trim() : "",
    };

    try {
      if (reference) {
        console.log(`🟠 Actualizando referencia con id: ${reference._id}`);
        await updateReference(reference._id, data);
      } else {
        console.log(`🟢 Creando nueva referencia para userId: ${userId}`);
        await createReference(userId, data);
      }
      refreshReferences(); // ✅ Actualizar después de guardar
    } catch (error) {
      console.error("❌ Error al guardar referencia:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reference-form">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Relación" required />
      <textarea value={testimony} onChange={(e) => setTestimony(e.target.value)} placeholder="Testimonio" required />
      <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="URL de imagen" />
      <button type="submit">
        {reference ? "Actualizar Referencia" : "Guardar Referencia"}
      </button>
    </form>
  );
};

export default ReferenceForm;
