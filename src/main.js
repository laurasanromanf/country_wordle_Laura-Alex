import './css/main.css';
import { evaluateGuess } from './services/guessService.js';
import countries from './data/countries.json';
import { getDailyRandomIndex } from './utils/randomIndex.js';
import { getCountry } from './services/countryService.js';

// 1. Crear el objeto JSON vacío para guardar los datos del país
let gameState = {};

async function initGame() {
  // 2. Comprobar si el estado está vacío al cargar la página
  if (Object.keys(gameState).length === 0) {
    // 3. Usar random para escoger un index basado en la longitud del dataset
    const index = getDailyRandomIndex(countries.length);

    // 4. Sacar el nombre del país del JSON de datos usando el index
    const targetCountryName = countries[index];

    // 5. Llamar a la API para obtener el JSON del país
    const countryData = await getCountry(targetCountryName);

    // 6. Almacenar los datos devueltos en nuestro JSON vacío
    if (countryData) {
      gameState = countryData;
      gameState.name = targetCountryName;
      console.log('Datos del país objetivo:', gameState);
      const result = await evaluateGuess('Kiribati', gameState);

      console.log('Resultado del intento:', result);
    }
  }
}

initGame();

import heroImg from './assets/hero.png';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from './assets/vite.svg';
import { setupCounter } from './counter.js';
