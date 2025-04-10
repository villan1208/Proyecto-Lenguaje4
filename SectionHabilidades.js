import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHabilidades } from "../api/habilidadesApi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Star, StarBorder } from "@mui/icons-material";
import "../styles/SectionHabilidades.css";

const SectionHabilidades = ({ onCompleteChange }) => {
  const navigate = useNavigate();
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`✅ Firebase autenticado para UID: ${user.uid}`);
        loadHabilidades(user.uid);
      } else {
        console.log("❌ Usuario no autenticado");
        setHabilidades([]);
        setError("No hay datos de habilidades disponibles.");
        setLoading(false);
        onCompleteChange("habilidades", false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadHabilidades = async (uid) => {
    try {
      setLoading(true);
      const { data } = await getHabilidades(uid);
      setHabilidades(data || []);
      setError("");
      onCompleteChange("habilidades", data && data.length > 0); // ✅ Notifica
    } catch (err) {
      console.error("❌ Error al cargar las habilidades:", err.message);
      setHabilidades([]);
      setError("No hay datos de habilidades disponibles.");
      onCompleteChange("habilidades", false); // ❌ En error
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (level) => (
    <div className="stars">
      {[...Array(5)].map((_, i) =>
        i < level ? (
          <Star key={i} style={{ color: "#ffcc00" }} />
        ) : (
          <StarBorder key={i} style={{ color: "#888" }} />
        )
      )}
    </div>
  );

  const renderProgress = (level) => (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${(level / 5) * 100}%` }}
      ></div>
    </div>
  );

  if (loading) return null;

  return (
    <div className="section-habilidades">
      <div className="section-habilidades-header">
        <h2>Habilidades</h2>
        <button
          className="section-habilidades-btn"
          onClick={() => navigate("/habilidades")}
        >
          {habilidades.length > 0 ? "Editar" : "Crear"}
        </button>
      </div>

      {habilidades.length > 0 ? (
        <div>
          {habilidades.map((habilidad) => (
            <div key={habilidad._id} className="habilidad-item">
              <div className="habilidad-info">
                <span className="habilidad-nombre">
                  <strong>{habilidad.name}</strong>
                </span>
                <span className="habilidad-categoria">
                  — {habilidad.category}
                </span>
              </div>

              {renderStars(habilidad.level)}
              {renderProgress(habilidad.level)}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#888" }}>{error}</p>
      )}
    </div>
  );
};

export default SectionHabilidades;































































































