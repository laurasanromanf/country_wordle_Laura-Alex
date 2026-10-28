export async function getCountry(countryName) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const normalize = (name) =>
    String(name ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLocaleLowerCase('es');

  try {
    const url =
      `${baseUrl}?q=${encodeURIComponent(countryName)}` +
      '&response_fields=names,region,area.kilometers,flag.colors.palette,landlocked,population';

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error de la API: ${response.status}`);
    }

    const data = await response.json();
    const countries = data.data?.objects ?? [];
    const searchedName = normalize(countryName);

    // Buscar exclusivamente coincidencia exacta en la traducción española.
    const country = countries.find((item) => {
      const spanishNames = item.names?.translations?.spa;

      if (!spanishNames) {
        return false;
      }

      return (
        normalize(spanishNames.common) === searchedName ||
        normalize(spanishNames.official) === searchedName
      );
    });

    return country ?? null;
  } catch (error) {
    console.error('Hubo un problema con la petición:', error);
    return null;
  }
}
