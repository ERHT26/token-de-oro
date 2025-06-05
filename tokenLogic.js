const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_FOOTBALL_KEY;
const ligas = [39, 140, 61, 135, 78]; // Premier, LaLiga, Ligue 1, Serie A, Bundesliga

async function obtenerJugadores() {
  const jugadores = [];

  for (const liga of ligas) {
    try {
      const response = await axios.get('https://v3.football.api-sports.io/players', {
        params: { league: liga, season: 2024 },
        headers: { 'x-apisports-key': API_KEY }
      });
      jugadores.push(...response.data.response);
    } catch (err) {
      console.error('Error obteniendo datos de liga', liga, err.message);
    }
  }

  return jugadores;
}

function calcularPuntajeJugador(jugador) {
  const stats = jugador.statistics[0];
  let puntos = 0;
  if (!stats) return 0;

  puntos += (stats.goals?.total || 0) * 10;
  puntos += (stats.goals?.assists || 0) * 6;
  puntos += (stats.shots?.on || 0) * 3;
  puntos += (stats.passes?.key || 0) * 2;

  return puntos;
}

async function calcularGanador() {
  const jugadores = await obtenerJugadores();
  let maxPuntos = 0;
  let mejorJugador = { nombre: '', puntos: 0 };

  for (const jugador of jugadores) {
    const puntos = calcularPuntajeJugador(jugador);
    if (puntos > maxPuntos) {
      maxPuntos = puntos;
      mejorJugador = {
        nombre: jugador.player.name,
        puntos
      };
    }
  }

  return mejorJugador;
}

module.exports = { calcularGanador };