import React from "react";
import { deleteReference } from "../api/referenceApi";

const ReferenceCard = ({ reference, refreshReferences, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar esta referencia?")) {
      try {
        await deleteReference(reference._id);
        refreshReferences(); // ✅ Actualizar después de eliminar
        console.log("✅ Referencia eliminada correctamente");
      } catch (error) {
        console.error("❌ Error al eliminar referencia:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="reference-card">
      <h3>{reference.name}</h3>
      <p>
        <strong>Relación:</strong> {reference.relationship}
      </p>
      <p>
        <strong>Testimonio:</strong> {reference.testimony}
      </p>
      {reference.imageURL && (
        <img
          src={reference.imageURL}
          alt={reference.name}
          className="reference-image"
        />
      )}
      <div className="reference-actions">
        <button onClick={() => onEdit(reference)}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default ReferenceCard;

