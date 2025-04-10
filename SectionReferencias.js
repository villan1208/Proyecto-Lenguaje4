import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getMongoUserId } from "../services/firebase";
import { getReferences } from "../api/referenceApi";

const SectionReferencias = ({ onCompleteChange }) => {
  const navigate = useNavigate();
  const [references, setReferences] = useState([]);
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

  useEffect(() => {
    const loadReferences = async () => {
      try {
        if (userId) {
          const { data } = await getReferences(userId);
          setReferences(data);
          localStorage.setItem("references", JSON.stringify(data));
          onCompleteChange("referencias", data && data.length > 0);
        }
      } catch (error) {
        console.error("❌ Error al obtener referencias:", error.message);
        onCompleteChange("referencias", false);
      }
    };

    if (userId) {
      loadReferences();
    }
  }, [userId]);

  return (
    <div
      className="section"
      style={{
        padding: "20px",
        backgroundColor: "#2a3b4c",
        color: "white",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #ff9800",
          paddingBottom: "10px",
        }}
      >
        <h2>Referencias / Testimonios</h2>
        <button
          onClick={() => navigate("/referencias")}
          style={{
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Editar
        </button>
      </div>

      <div
        style={{
          margin: "15px 0",
          borderBottom: "1px solid #ff9800",
        }}
      ></div>

      {references.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "1rem",
          }}
        >
          {references.map((ref) => (
            <div
              key={ref._id}
              style={{
                background: "linear-gradient(135deg, #475072, #2e3192, #134a81)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #ff9800",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#ff9800", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                {ref.name}
              </h3>
              <p style={{ marginBottom: "0.3rem", color: "#fff" }}>
                <strong style={{ color: "#ff9800" }}>Relación:</strong> {ref.relationship}
              </p>
              <p style={{ fontStyle: "italic", marginBottom: "1rem", color: "#ccc" }}>
                <strong style={{ color: "#ff9800" }}>Testimonio:</strong> {ref.testimony}
              </p>

              {ref.imageURL && (
                <img
                  src={ref.imageURL}
                  alt={ref.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: "2px solid #ff9800",
                    backgroundColor: "#1a1a1a",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#ff9800", marginTop: "1rem" }}>
          No hay referencias disponibles.
        </p>
      )}
    </div>
  );
};

export default SectionReferencias;









































































































































































































































































































