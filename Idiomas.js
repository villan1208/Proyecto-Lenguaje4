// src/pages/views/Idiomas.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getIdiomas,
  addIdioma,
  updateIdioma,
  deleteIdioma,
} from "../../api/idiomasApi";
import LanguagesForm from "../../components/LanguagesForm";
import "../../styles/idiomas.css";

const Idiomas = () => {
  const [userId, setUserId] = useState(null);
  const [idiomas, setIdiomas] = useState([]);
  const [formData, setFormData] = useState({ language: "", level: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setUserId(user.uid);
      cargarIdiomas(user.uid);
    }
  }, []);

  const cargarIdiomas = async (uid) => {
    const data = await getIdiomas(uid);
    setIdiomas(data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const updated = await updateIdioma(userId, currentId, formData);
      setIdiomas(updated);
    } else {
      const added = await addIdioma(userId, formData);
      setIdiomas(added);
    }
    setFormData({ language: "", level: "" });
    setIsEditing(false);
  };

  const handleEdit = (lang) => {
    setFormData(lang);
    setCurrentId(lang._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const updated = await deleteIdioma(userId, id);
    setIdiomas(updated);
  };

  return (
    <div className="idiomas-container">
      <h2 className="idiomas-title">Idiomas</h2>
  
      <LanguagesForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
  
  <ul className="idiomas-list">
  {idiomas.map((lang) => (
    <li key={lang._id} className="idiomas-item">
      <h3 className="idiomas-nombre">{lang.language}</h3>
      <p className="idiomas-nivel">Nivel: {lang.level}</p>

      <div className="idiomas-buttons">
        <button className="idiomas-edit" onClick={() => handleEdit(lang)}>✏️ Editar</button>
        <button className="idiomas-delete" onClick={() => handleDelete(lang._id)}>🗑️ Eliminar</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
  
};

export default Idiomas;
