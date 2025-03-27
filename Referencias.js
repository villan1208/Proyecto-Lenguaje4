import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import { getReferences } from "../../api/referenceApi";
import ReferenceForm from "../../components/ReferenceForm";
import ReferenceCard from "../../components/ReferenceCard";
import '../../styles/Referencias.css';

const Referencias = () => {
  const [references, setReferences] = useState([]);
  const [editingReference, setEditingReference] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Obtener el userId desde Firebase y MongoDB
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(`✅ firebaseUid obtenido desde Firebase: ${user.uid}`);

      getMongoUserId(user.uid)
        .then((mongoId) => {
          console.log(`✅ userId obtenido desde MongoDB: ${mongoId}`);
          if (mongoId) {
            setUserId(mongoId);
            refreshReferences(mongoId); // ✅ Cargar referencias automáticamente
          } else {
            console.error("❌ userId es nulo");
          }
        })
        .catch((error) =>
          console.error("❌ Error al obtener userId desde MongoDB:", error)
        );
    } else {
      console.log("❌ No se encontró ningún usuario en Firebase");
    }
  }, []);

  // ✅ Obtener referencias desde la API
  const refreshReferences = async (mongoId) => {
    if (!mongoId) {
      console.error("❌ userId es nulo, cancelando solicitud");
      return;
    }

    try {
      console.log(`➡️ Buscando referencias para userId: ${mongoId}`);
      const { data } = await getReferences(mongoId);
      console.log("✅ Referencias obtenidas:", data);

      // ✅ Actualiza el estado con las referencias obtenidas
      setReferences([...data]);
    } catch (error) {
      console.error("❌ Error al obtener referencias:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="references-page">
      {/* Agregado el enunciado de bienvenida */}
      <h1>Bienvenido a la área de testimonio y referencia</h1>
      
      {/* ✅ Formulario para añadir/editar referencias */}
      {userId && (
        <ReferenceForm
          userId={userId}
          reference={editingReference}
          refreshReferences={() => refreshReferences(userId)}
        />
      )}

      {/* ✅ Renderizar las tarjetas de referencias */}
      {references.map((ref, index) => (
        <ReferenceCard
          key={`${ref._id}-${index}`}
          reference={ref}
          refreshReferences={() => refreshReferences(userId)}
          onEdit={(ref) => setEditingReference(ref)}
        />
      ))}
    </div>
  );
};

export default Referencias;
