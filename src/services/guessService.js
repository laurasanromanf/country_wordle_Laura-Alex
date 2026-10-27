import { getCountry } from './countryService.js';
import {
  compareCountries,
  normalizeCountryName,
} from '../utils/compareCountries.js';

export async function evaluateGuess(countryName, gameState) {
  const attemptedName = countryName.trim();

  if (!attemptedName) {
    throw new Error('El nombre del país no puede estar vacío.');
  }

  if (!gameState?.name) {
    throw new Error('El país objetivo todavía no está cargado.');
  }

  const isCorrectCountry =
    normalizeCountryName(attemptedName) ===
    normalizeCountryName(gameState.name);

  const attemptedCountry = isCorrectCountry
    ? gameState
    : await getCountry(attemptedName);

  if (!attemptedCountry) {
    throw new Error(`No se han encontrado datos para "${attemptedName}".`);
  }

  return compareCountries(gameState, attemptedCountry, attemptedName);
}
