import React, { useEffect, useState } from 'react';
import API from './services/api';  // Importa la instancia de Axios

const App = () => {
    const [data, setData] = useState('');  // Estado para almacenar la respuesta

    useEffect(() => {
        // Hacemos la solicitud GET al backend
        API.get('/api/data')
            .then(response => {
                setData(response.data.message);  // Guardamos el mensaje en el estado
            })
            .catch(error => {
                console.error('Error:', error);  // Manejo de errores
            });
    }, []);  // Este useEffect se ejecuta una sola vez, cuando el componente se monta

    return (
        <div>
            <h1>{data || 'Cargando...'}</h1>  {/* Muestra el mensaje o "Cargando..." */}
        </div>
    );
};

export default App;
