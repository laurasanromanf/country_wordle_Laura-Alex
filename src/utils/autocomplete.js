import countries from '../data/countries.json';

export function filterCountries(inputText) {
  if (!inputText) return [];
  const lowerInput = inputText.toLowerCase();
  // Filtra los países que incluyan la cadena de texto introducida
  return countries.filter(country => 
    country.toLowerCase().includes(lowerInput)
  );
}