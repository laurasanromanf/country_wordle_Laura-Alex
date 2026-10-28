import countries from '../data/countries.json';

export function filterCountries(inputText) {
  if (!inputText) return [];
  const lowerInput = inputText.toLowerCase();

  return countries.filter(country => 
    country.toLowerCase().includes(lowerInput)
  );
}