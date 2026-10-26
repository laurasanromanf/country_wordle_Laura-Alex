export async function getCountry(countryName) {
  // Llama a la URL que guardaste en el .env
  const baseUrl = import.meta.env.VITE_API_URL;
  
  try {
    // Hace la petición a la API concatenando la URL base y el nombre del país
    const response = await fetch(`${baseUrl}name/${countryName}`);
    
    if (!response.ok) {
      throw new Error('Error al conectar con la API');
    }
    
    const data = await response.json();
    return data[0]; // Devuelve los datos del primer país que coincida
  } catch (error) {
    console.error("Hubo un problema con la petición:", error);
    return null;
  }
}