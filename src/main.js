import './css/style.css';

// Importamos los datos y funciones que creaste en las tareas anteriores
import countries from './data/countries.json';
import { getDailyRandomIndex } from './utils/randomIndex.js';
import { getCountry } from './services/countryService.js';

// 1. Crear el objeto JSON vacío para guardar los datos del país
let gameState = {};

async function initGame() {
  // 2. Comprobar si el estado está vacío al cargar la página[cite: 14]
  if (Object.keys(gameState).length === 0) {
    
    // 3. Usar random para escoger un index basado en la longitud del dataset[cite: 14]
    const index = getDailyRandomIndex(countries.length);
    
    // 4. Sacar el nombre del país del JSON de datos usando el index[cite: 14]
    const targetCountryName = countries[index];
    
    // 5. Llamar a la API para obtener el JSON del país[cite: 14]
    const countryData = await getCountry(targetCountryName);
    
    // 6. Almacenar los datos devueltos en nuestro JSON vacío[cite: 14]
    if (countryData) {
      gameState = countryData;
      console.log("Datos del país cargados en el estado:", gameState);
    }
  }
}

// Ejecutar la función inicializadora al abrir la web
initGame();import heroImg from './assets/hero.png';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from './assets/vite.svg';
import { setupCounter } from './counter.js';
