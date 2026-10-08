# 🌍 Countryle

¡Un juego estilo Pokedle / Wordle diario basado en países! Adivina el país del día utilizando pistas como el continente, la población, la superficie y los colores de la bandera.

## 🚀 Características

- **País Diario Aleatorio:** Todos los jugadores se enfrentan al mismo reto cada día, calculado matemáticamente a partir de la fecha local.
- **Sin Dependencias de Backend:** La lógica del juego se ejecuta íntegramente en el cliente.
- **Progresión Persistente:** El estado de la partida se guarda en la memoria del navegador para no perder los intentos al recargar.
- **Integración API:** Consumo de datos actualizados a través de [REST Countries API](https://restcountries.com/).

## 🛠️ Stack Tecnológico

Este proyecto está construido con los estándares modernos de desarrollo frontend:

- **Core:** HTML5, CSS3, Vanilla JavaScript.
- **Build Tool:** [Vite](https://vitejs.dev/) para un entorno de desarrollo ultrarrápido y empaquetado optimizado.
- **Calidad de Código:** [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) integrados para mantener un código limpio y estandarizado.
- **Entorno:** Node.js para la gestión de dependencias y scripts.

## ⚙️ Instalación y Uso en Local

Para clonar y ejecutar este proyecto en tu máquina, necesitas tener [Node.js](https://nodejs.org/) instalado.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/laurasanromanf/country_wordle_Laura-Alex.git
   cd countryle
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Asegúrate de que la variables API y API KEY apuntan correctamente).*

4. **Arrancar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre http://localhost:5173 en tu navegador para ver la aplicación.

## 🧹 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.

## 👥 Autores

- **Alex** - [GitHub](https://github.com/adguez27) | [LinkedIn](www.linkedin.com/in/alex-domínguez-andré)
- **Laura** - [GitHub](https://github.com/laurasanromanf)
