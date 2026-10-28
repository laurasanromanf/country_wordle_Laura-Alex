import './css/main.css';
import { evaluateGuess } from './services/guessService.js';
import { evaluateGuess } from './services/guessService.js';
import countries from './data/countries.json';
import { getDailyRandomIndex } from './utils/randomIndex.js';
import { getCountry } from './services/countryService.js';
import { renderGuess } from './utils/renderGuess.js';

// Estado del juego: contiene los datos del país objetivo.
let gameState = {};

// Referencias a los elementos de la interfaz.
const countryInput = document.querySelector('#country-search');
const guessButton = document.querySelector('#btn-guess');
const boardContainer = document.querySelector('#board-container');
const guessError = document.querySelector('#guess-error');

// Inicializa el juego y carga el país del día.
async function initGame() {
  const index = getDailyRandomIndex(countries.length);
  const targetCountryName = countries[index];

  const countryData = await getCountry(targetCountryName);

  if (!countryData) {
    throw new Error('No se han podido cargar los datos del país objetivo.');
  }

  gameState = {
    ...countryData,
    name: targetCountryName,
  };
}

// Procesa un intento del jugador.
async function handleGuess() {
  const countryName = countryInput.value.trim();

  if (!countryName) return;

  // Evita que se envíen varios intentos simultáneamente.
  guessButton.disabled = true;
  guessError.textContent = '';

  try {
    // Espera a que el país objetivo esté cargado.
    await gameReady;
    if (!gameState.name) {
      throw new Error('El juego todavía no está disponible.');
    }
    // Evalúa el país introducido.
    const result = await evaluateGuess(countryName, gameState);

    // Muestra el resultado en el historial.
    renderGuess(result, boardContainer);

    // Limpia el campo solo si el intento se ha procesado correctamente.
    countryInput.value = '';
    countryInput.focus();
  } catch (error) {
    guessError.textContent = error.message;
  } finally {
    guessButton.disabled = false;
  }
}

// Registra los eventos de la interfaz.
guessButton.addEventListener('click', handleGuess);

countryInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleGuess();
  }
});

const gameReady = initGame().catch((error) => {
  guessError.textContent = error.message;
  return null;
});
