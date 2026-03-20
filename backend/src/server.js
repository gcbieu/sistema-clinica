const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// Importação das Rotas
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

// Definição das Rotas
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sistema_clinica')
  .then(() => console.log("✅ MongoDB Conectado com Sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});