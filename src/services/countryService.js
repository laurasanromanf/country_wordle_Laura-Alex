export async function getCountry(countryName) {
  // Llama a la URL que guardaste en el .env
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    // Hace la petición a la API concatenando la URL base y el nombre del país
    const response = await fetch(
      `${baseUrl}${countryName}+&response_fields=region,area.kilometers,flag.colors.palette,landlocked,population`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error al conectar con la API');
    }

    const data = await response.json();

    return data.data.objects[0]; // Devuelve los datos del primer país que coincida
  } catch (error) {
    console.error('Hubo un problema con la petición:', error);
    return null;
  }
}
