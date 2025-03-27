
import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { getHabilidades, createHabilidad, updateHabilidad, deleteHabilidad } from '../../api/habilidadesApi';
import SkillsForm from '../../components/SkillsForm';
import { Snackbar, Alert } from '@mui/material';
import styled from 'styled-components';

const Habilidades = () => {
  const [habilidades, setHabilidades] = useState([]); // Estado para las habilidades
  const [formData, setFormData] = useState({ name: '', category: '', level: 1 }); // Estado para el formulario
  const [editingHabilidadId, setEditingHabilidadId] = useState(null); // Estado para la habilidad que se edita
  const [message, setMessage] = useState({ text: '', severity: '' }); // Estado para los mensajes de alerta
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para abrir el Snackbar
  const auth = getAuth();
  
  const formRef = useRef(null); // Referencia para el formulario
  const habilidadesRefs = useRef([]); // Referencia para las habilidades en la lista

  // Usamos useEffect para cargar las habilidades al montar el componente
  useEffect(() => {
    const loadHabilidades = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Intentar cargar las habilidades del localStorage
          const storedHabilidades = localStorage.getItem('habilidades');
          if (storedHabilidades) {
            setHabilidades(JSON.parse(storedHabilidades)); // Cargar habilidades desde localStorage
          } else {
            // Si no hay habilidades en localStorage, las cargamos desde la base de datos
            const { data } = await getHabilidades(user.uid); // Recargar las habilidades de la base de datos
            setHabilidades(data); // Guardar las habilidades en el estado
            localStorage.setItem('habilidades', JSON.stringify(data)); // Almacenar habilidades en localStorage
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    loadHabilidades(); // Llamar la función para cargar las habilidades
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      let updatedHabilidades = [];
      if (editingHabilidadId) {
        // Actualizar habilidad
        const { data } = await updateHabilidad(user.uid, editingHabilidadId, formData);
        updatedHabilidades = habilidades.map((hab) => 
          hab._id === editingHabilidadId ? data : hab
        );
        setHabilidades(updatedHabilidades);
        localStorage.setItem('habilidades', JSON.stringify(updatedHabilidades)); // Actualizar localStorage
        setEditingHabilidadId(null);
        setMessage({ text: '✅ Habilidad actualizada correctamente', severity: 'success' });
      } else {
        // Crear nueva habilidad
        const { data } = await createHabilidad(user.uid, formData);
        updatedHabilidades = [...habilidades, data];
        setHabilidades(updatedHabilidades);
        localStorage.setItem('habilidades', JSON.stringify(updatedHabilidades)); // Guardar en localStorage
        setMessage({ text: '✅ Habilidad creada correctamente', severity: 'success' });
      }

      setFormData({ name: '', category: '', level: 1 });
      setOpenSnackbar(true);

      // Desplazamos el scroll hacia la habilidad recién creada o actualizada
      if (habilidadesRefs.current.length > 0) {
        const lastHabilidadRef = habilidadesRefs.current[habilidades.length - 1];
        setTimeout(() => {
          lastHabilidadRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    } catch (error) {
      setMessage({ text: `❌ Error: ${error.message}`, severity: 'error' });
      setOpenSnackbar(true);
    }
  };

  const cancelEdit = () => {
    setEditingHabilidadId(null);
    setFormData({ name: '', category: '', level: 1 });
  };

  const handleEdit = (habilidad) => {
    setFormData({
      name: habilidad.name,
      category: habilidad.category,
      level: habilidad.level
    });
    setEditingHabilidadId(habilidad._id);

    // Desplazamos al formulario
    if (formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const handleDelete = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuario no autenticado');

      await deleteHabilidad(user.uid, id);
      const updatedHabilidades = habilidades.filter((hab) => hab._id !== id);
      setHabilidades(updatedHabilidades);
      localStorage.setItem('habilidades', JSON.stringify(updatedHabilidades)); // Actualizar localStorage
      setMessage({ text: '✅ Habilidad eliminada correctamente', severity: 'success' });
      setOpenSnackbar(true);
    } catch (error) {
      setMessage({ text: `❌ Error: ${error.message}`, severity: 'error' });
      setOpenSnackbar(true);
    }
  };

  const renderStars = (level) => {
    return [...Array(5)].map((_, i) =>
      React.createElement(Star, {
        key: i,
        filled: i < level,
      })
    );
  };

  return (
    <Container>
      <Title>Gestor de Habilidades</Title>

      {/* Formulario */}
      <SkillsForm
        formRef={formRef}  // Pasar la referencia al formulario
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
        editingHabilidadId={editingHabilidadId}
      />

      {/* Mostrar habilidades creadas */}
      {habilidades.length > 0 ? (
        habilidades.map((habilidad, index) => (
          <SkillCard key={habilidad._id} ref={(el) => habilidadesRefs.current[index] = el}>
            <SkillHeader>
              <SkillTitle>{habilidad.name}</SkillTitle>
              <Category>— {habilidad.category}</Category>
            </SkillHeader>

            <SkillContent>
              {renderStars(habilidad.level)}
              <ProgressBarWrapper>
                <ProgressBar style={{ width: `${(habilidad.level / 5) * 100}%` }} />
              </ProgressBarWrapper>
            </SkillContent>

            <ButtonGroup>
              <Button onClick={() => handleEdit(habilidad)}>Editar</Button>
              <Button eliminar onClick={() => handleDelete(habilidad._id)}>Eliminar</Button>
            </ButtonGroup>
          </SkillCard>
        ))
      ) : (
        <p>No tienes habilidades creadas aún.</p>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Habilidades;




// Estilo de las estrellas
const Star = styled.span`
  font-size: 20px;
  color: ${({ filled }) => (filled ? '#FFA500' : '#888')};
  margin-right: 4px;
`;

// Estilo del contenedor principal
const Container = styled.div`
  padding: 20px;
`;

const SkillTitle = styled.h3`
  color: #FFF;
`;

const Category = styled.span`
  color: #FFFFFF;
`;

const Title = styled.h2`
  color:rgb(255, 255, 255);
  text-align: center; /* Centrado horizontal */
  font-size: 36px;
  font-weight: bold;

  
`;

const SkillCard = styled.div`
  background: linear-gradient(135deg, #475072, #2e3192, #134a81);
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid #e0e0e0;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SkillContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background-color: #222;
  border-radius: 5px;
  margin-left: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #2196F3;
  transition: width 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 6px 14px;
  background-color: ${({ eliminar }) => (eliminar ? '#D32F2F' : '#FFA500')};
  color: #FFF;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ eliminar }) => (eliminar ? '#b71c1c' : '#e68900')};
  }
`;













































































































































































































































































































































































































































































































































































































































































































