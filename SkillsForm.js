import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Lista de habilidades y categorías predefinidas
const habilidadesData = {
  'Comunicación Efectiva': ['Liderazgo y Gestión', 'Colaboración', 'Pensamiento Crítico', 'Desarrollo Personal', 'Innovación'],
  'Trabajo en Equipo': ['Colaboración', 'Liderazgo', 'Adaptabilidad', 'Creatividad', 'Desarrollo Personal'],
  'Resolución de Problemas': ['Pensamiento Crítico', 'Análisis', 'Adaptabilidad', 'Innovación', 'Estrategia'],
  'Adaptabilidad': ['Desarrollo Personal', 'Flexibilidad', 'Innovación', 'Creatividad', 'Gestión del Cambio'],
  'Creatividad': ['Innovación', 'Diseño', 'Estrategia', 'Desarrollo Personal', 'Pensamiento Crítico'],
  'Programación en Java': ['Desarrollo de Software', 'Backend', 'Frontend', 'Sistemas', 'Bases de Datos'],
  'Diseño Gráfico (Photoshop)': ['Diseño y Creatividad', 'Marketing', 'UX/UI', 'Producción', 'Branding'],
  'Excel Avanzado': ['Análisis de Datos', 'Finanzas', 'Administración', 'Automatización', 'Contabilidad'],
  'Administración de Redes': ['TI y Seguridad', 'Infraestructura', 'Sistemas', 'Redes', 'Soporte'],
  'Análisis Financiero': ['Finanzas y Contabilidad', 'Análisis', 'Consultoría', 'Estrategia', 'Planificación'],
};

const SkillsForm = ({ formRef, formData, handleChange, handleSubmit, cancelEdit, editingHabilidadId }) => {
  const categoriaRef = useRef();

  const [customHabilidad, setCustomHabilidad] = useState('');
  const [customCategoria, setCustomCategoria] = useState('');
  const [selectedHabilidad, setSelectedHabilidad] = useState(formData.name || '');
  const [selectedCategoria, setSelectedCategoria] = useState(formData.category || '');

  const categorias = selectedHabilidad && habilidadesData[selectedHabilidad] ? habilidadesData[selectedHabilidad] : [];

  useEffect(() => {
    if (selectedHabilidad === 'Otro') {
      setCustomCategoria('');
      categoriaRef.current.focus();  // Enfocar el campo de categoría automáticamente
    }
  }, [selectedHabilidad]);

  return (
    <FormContainer ref={formRef}>
      <Form onSubmit={handleSubmit}>
        {/* Habilidad */}
        <InputWrapper>
          <Label>Habilidad:</Label>
          {selectedHabilidad === 'Otro' ? (
            <Input
              type="text"
              placeholder="Escribe tu habilidad"
              value={customHabilidad}
              onChange={(e) => {
                setCustomHabilidad(e.target.value);
                handleChange({ target: { name: 'name', value: e.target.value } });
              }}
              required
            />
          ) : (
            <Select
              name="name"
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
                setSelectedHabilidad(e.target.value);
                if (e.target.value !== 'Otro') {
                  setCustomHabilidad('');
                }
              }}
              required
            >
              <option value="">Seleccione una habilidad</option>
              {Object.keys(habilidadesData).map((habilidad) => (
                <option key={habilidad} value={habilidad}>
                  {habilidad}
                </option>
              ))}
              <option value="Otro">Otro</option>
            </Select>
          )}
        </InputWrapper>

        {/* Categoría */}
        <InputWrapper>
          <Label>Categoría:</Label>
          {selectedCategoria === 'Otro' ? (
            <Input
              type="text"
              placeholder="Escribe tu categoría"
              value={customCategoria}
              onChange={(e) => {
                setCustomCategoria(e.target.value);
                handleChange({ target: { name: 'category', value: e.target.value } });
              }}
              ref={categoriaRef}
              required
            />
          ) : (
            <Select
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleChange(e);
                setSelectedCategoria(e.target.value);
                if (e.target.value !== 'Otro') {
                  setCustomCategoria('');
                }
              }}
              ref={categoriaRef}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
              <option value="Otro">Otro</option>
            </Select>
          )}
        </InputWrapper>

        {/* Nivel */}
        <InputWrapper>
          <Label>Nivel (1-5):</Label>
          <Input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            min={1}
            max={5}
            required
          />
        </InputWrapper>

        {/* Botones */}
        <ButtonContainer>
          <SubmitButton type="submit">{editingHabilidadId ? 'Actualizar' : 'Agregar'}</SubmitButton>
          {editingHabilidadId && (
            <CancelButton type="button" onClick={cancelEdit}>
              Cancelar
            </CancelButton>
          )}
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default SkillsForm;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #475072, #2e3192, #134a81); /* Gradiente de fondo */
   border: 1px solid #e0e0e0;
`;

const Form = styled.form`
  background: linear-gradient(135deg, #475072, #2e3192, #134a81); /* Gradiente de fondo */
  padding: 50px; /* Aumentado el padding para hacerlo más grande */
  border-radius: 12px;
  color: #fff; /* Texto blanco */
  width: 100%;
  max-width: 600px; /* Aumentado el tamaño del formulario */
  min-height: 400px; /* Añadido para estirar el formulario verticalmente */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Sombra adicional */
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px); /* Efecto de desenfoque más fuerte */
  -webkit-backdrop-filter: blur(12px); /* Efecto de desenfoque para Safari */
  background: linear-gradient( #0a83ff,135deg, #1a2a6c, #2e3192, #0a83ff); /* Fondo degradado en tonos de azul */
 border-radius: 0 15px 15px 0; /* Bordes redondeados en la parte derecha */
 overflow: hidden; /* Evita que la imagen sobresalga */
 /* Borde inicial */
 border: 2px solid #0a83ff;
    
 /* 🔹 Animación del borde luminoso */
 animation: borderGlow 2s infinite alternate; /* Aplica la animación */

/* 🔹 Efecto luminoso animado */
@keyframes borderGlow {
    
    
    
    
    50% {
        border-color: #0a83ff; /* Cambia a un color brillante */
        box-shadow: 0 0 5px #1a2a6c, 0 0 20px #1a2a6c, 0 0 1px #1a2a6c; /* Brillo más intenso */
    }
    100% {
        border-color: #0a83ff; /* Vuelve al color original */
        box-shadow: 0 0 5px #0a83ff, 0 0 1px #0a83ff, 0 0 15px #0a83ff; /* Sombra tenue */
    }
}


`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  color: #f4f4f4; /* Color de texto blanco suave */
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c54; /* Fondo de los inputs */
  color: #f4f4f4; /* Texto blanco */
  outline: none;
  transition: border 0.3s ease;
  width: 100%;
  margin-bottom: 12px;
  &:hover {
    border-color: #00aaff; /* Azul de los botones al pasar el mouse */
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c54; /* Fondo de los inputs */
  color: #f4f4f4; /* Texto blanco */
  outline: none;
  transition: border 0.3s ease;
  width: 100%;
  margin-bottom: 12px;
  &:hover {
    border-color: #00aaff; /* Resalta el borde con el mismo color azul al pasar el mouse */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background: #e77518;
  color: #fff; /* Texto blanco */
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease;
  width: 48%;
  &:hover {
    background-color: #0077cc; /* Azul más oscuro */
  }
`;

const CancelButton = styled.button`
  background-color: #ff4d4d; /* Rojo */
  color: #fff; /* Texto blanco */
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease;
  width: 48%;
  &:hover {
    background-color: #e63946; /* Rojo más oscuro */
  }
`;






































































































































































































