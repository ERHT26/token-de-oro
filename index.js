const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { calcularGanador } = require('./tokenLogic');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/ganador', async (req, res) => {
  try {
    const ganador = await calcularGanador();
    res.json(ganador);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular el ganador' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});