import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getMongoUserId } from "../../services/firebase";
import { getSocials, updateSocials, deleteSocials } from "../../api/contactApi"; // Importar funciones necesarias
import ContactForm from "../../components/ContactForm"; // Crear el formulario de contacto
import SocialCard from "../../components/SocialCard"; // Crear la tarjeta de redes sociales
import "../../styles/Contactos.css";  // Importar el CSS específico para Contactos

const Contactos = () => {
  const [socials, setSocials] = useState({}); // Estado para almacenar las redes sociales
  const [editingSocial, setEditingSocial] = useState(null); // Estado para almacenar la red social en edición
  const [userId, setUserId] = useState(null); // Estado para almacenar el userId

  // 🔄 Obtener userId desde Firebase y MongoDB
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
            refreshSocials(mongoId);
          } else {
            console.error("❌ userId es nulo");
          }
        })
        .catch((error) => console.error("❌ Error al obtener userId:", error));
    }
  }, []);

  // 🔄 Obtener redes sociales desde la API
  const refreshSocials = async (mongoId) => {
    if (!mongoId) {
      console.error("❌ userId es nulo, cancelando solicitud");
      return;
    }

    try {
      console.log(`➡️ Buscando redes sociales para userId: ${mongoId}`);
      const { data } = await getSocials(mongoId);
      console.log("✅ Redes sociales obtenidas:", data);

      // ✅ Actualiza el estado con las redes sociales obtenidas
      setSocials(data);
    } catch (error) {
      console.error("❌ Error al obtener redes sociales:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  // 🔄 Guardar cambios en redes sociales
  const handleSaveSocials = async (newData) => {
    try {
      console.log("➡️ Guardando redes sociales...");
      await updateSocials(userId, newData);  // Usamos la API para guardar las redes sociales
      console.log("✅ Redes sociales guardadas correctamente");
      refreshSocials(userId); // Refrescar después de guardar
      setEditingSocial(null); // Limpiar el estado de edición
    } catch (error) {
      console.error("❌ Error al guardar redes sociales:", error.message);
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteSocials(userId, key); // Llamada a la API para eliminar la red social
      refreshSocials(userId); // Refrescar la lista de redes sociales después de la eliminación
    } catch (error) {
      console.error("❌ Error al eliminar red social:", error.message);
    }
  };

  const excludeKeys = ["_id", "userId", "__v", "createdAt", "updatedAt"]; // Excluir claves no necesarias

  return (
    <div className="contact-page">
      {/* Sección de formulario y tarjetas de redes sociales en columnas */}
      <div className="contact-container">
        {/* Formulario para añadir o editar redes sociales */}
        {userId && (
          <ContactForm
            userId={userId}
            socials={editingSocial || socials} // Si estamos editando, mostramos los datos de edición
            handleSaveSocials={handleSaveSocials} // Función para guardar las redes sociales
          />
        )}

        {/* Renderizar redes sociales existentes */}
        <div className="social-cards">
          {Object.entries(socials)
            .filter(([key, value]) => !excludeKeys.includes(key) && value) // Filtrar las claves y solo mostrar redes sociales con datos
            .map(([key, value]) => (
              <SocialCard
                key={key}
                name={key} // El nombre de la red social (linkedin, github, etc.)
                url={value} // El enlace de la red social
                onEdit={(name, url) => setEditingSocial({ [name]: url })} // Función para editar
                onDelete={() => handleDelete(key)} // Función para eliminar red social específica
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Contactos;
