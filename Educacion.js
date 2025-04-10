// src/pages/views/Educacion.js
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation
} from "../../api/educationApi";
import EducationForm from "../../components/EducationForm";
import "../../styles/educacion.css";

const Educacion = () => {
  const [userId, setUserId] = useState(null);
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setUserId(user.uid);
      loadEducation(user.uid);
    }
  }, []);

  const loadEducation = async (uid) => {
    const data = await getEducation(uid);
    setEducationList(data);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const updated = await updateEducation(userId, currentId, formData);
      setEducationList(updated);
    } else {
      const added = await addEducation(userId, formData);
      setEducationList(added);
    }
    setIsEditing(false);
    setFormData({ institution: "", degree: "", startDate: "", endDate: "", description: "" });
  };

  const handleEdit = (edu) => {
    setFormData(edu);
    setCurrentId(edu._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const updated = await deleteEducation(userId, id);
    setEducationList(updated);
  };

  return (
    <div className="educacion-container">
      <h2 className="educacion-title">Educación</h2>
  
      <EducationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
  <ul className="educacion-list">
  {educationList.map((edu) => (
    <li key={edu._id} className="educacion-item">
      <h3 className="educacion-institucion">{edu.institution}</h3>
      <p className="educacion-titulo">{edu.degree}</p>
      <p className="educacion-fechas">
        {edu.startDate} - {edu.endDate || "Actualidad"}
      </p>
      {edu.description && <p className="educacion-descripcion">{edu.description}</p>}
      
      <div className="educacion-buttons">
        <button className="educacion-edit" onClick={() => handleEdit(edu)}>✏️ Editar</button>
        <button className="educacion-delete" onClick={() => handleDelete(edu._id)}>🗑️ Eliminar</button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
  
};

export default Educacion;
