// src/components/SectionVistaPrevia.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getMongoUserId } from "../services/firebase";
const SectionVistaPrevia = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getMongoUserId(user.uid)
          .then((mongoId) => {
            if (mongoId) {
              setUserId(mongoId);
            } else {
              onCompleteChange("referencias", false);
            }
          })
          .catch((error) => {
            console.error("❌ Error al obtener userId desde MongoDB:", error);
            onCompleteChange("referencias", false);
          });
      } else {
        onCompleteChange("referencias", false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="section">
      <div className="section-header">
        <h2>Vista Previa General</h2>
        <button className="edit-btn" onClick={() => navigate("/vistaprevia")}>
          Editar
        </button>
      </div>
      <p>Aquí irá la vista previa del perfil...</p>
    </div>
  );
};

export default SectionVistaPrevia;

