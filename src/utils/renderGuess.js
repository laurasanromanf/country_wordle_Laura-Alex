const FIELD_LABELS = {
  name: 'País',
  region: 'Región',
  area: 'Superficie',
  flagColors: 'Colores de la bandera',
  coastal: 'Costero',
  population: 'Población',
};

const COLOR_CLASSES = {
  green: 'correct',
  orange: 'partial',
  gray: 'incorrect',
};

function formatValue(value) {
  if (value === null || value === undefined) {
    return 'Sin datos';
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'Sin datos';
  }

  return String(value);
}

export function renderGuess(result, container) {
  // Crear los encabezados una sola vez.
  let headers = container.querySelector('.guess-headers');

  if (!headers) {
    headers = document.createElement('div');
    headers.classList.add('guess-headers');

    Object.entries(FIELD_LABELS).forEach(([field, labelText]) => {
      const label = document.createElement('span');
      label.textContent = labelText;
      headers.appendChild(label);
    });

    container.appendChild(headers);
  }

  const row = document.createElement('div');
  row.classList.add('guess-row');

  result.forEach(
    ({ field, value, color, direction, correctCount, totalCount }) => {
      const tile = document.createElement('div');

      tile.classList.add('tile', COLOR_CLASSES[color] ?? 'incorrect');

      if (field === 'flagColors') {
        // Estos dos valores deben venir del comparador.
        tile.textContent =
          correctCount !== undefined && totalCount !== undefined
            ? `${correctCount}/${totalCount}`
            : 'Sin datos';

        tile.setAttribute(
          'aria-label',
          `Colores de la bandera: ${tile.textContent}`
        );

        row.appendChild(tile);
        return;
      }

      const valueElement = document.createElement('span');
      let displayedValue = formatValue(value);

      if (direction === 'up') displayedValue = `↑ ${displayedValue}`;
      if (direction === 'down') displayedValue = `↓ ${displayedValue}`;

      valueElement.textContent = displayedValue;
      tile.appendChild(valueElement);
      row.appendChild(tile);
    }
  );

  // Insertar el intento nuevo justo después de los encabezados.
  headers.after(row);
}
