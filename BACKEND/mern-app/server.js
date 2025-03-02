const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');  // Importa cors

dotenv.config();
connectDB();

const app = express();

app.use(cors());  // Agrega CORS para permitir solicitudes desde el frontend
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Aquí puedes agregar otros endpoints de la API
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const landingRoutes = require("./routes/landingRoutes");
app.use("/api/landing", landingRoutes);

