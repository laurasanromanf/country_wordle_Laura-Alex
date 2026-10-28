const FIELD_LABELS = {
  name: 'País',
  region: 'Continente',
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

const CONTINENT_NAMES = {
  Africa: 'África',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Americas: 'América',
  'North America': 'Norteamérica',
  'South America': 'Sudamérica',
  Antarctica: 'Antártida',
  Antarctic: 'Antártida',
};

const NUMBER_FORMATTER = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 2,
});

function formatValue(value, field) {
  if (value === null || value === undefined) {
    return 'Sin datos';
  }

  if (field === 'region') {
    return CONTINENT_NAMES[value] ?? value;
  }

  if (field === 'area' || field === 'population') {
    return typeof value === 'number' && Number.isFinite(value)
      ? NUMBER_FORMATTER.format(value)
      : String(value);
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'Sin datos';
  }

  return String(value);
}

export function renderGuess(result, container) {
  let headers = container.querySelector('.guess-headers');

  if (!headers) {
    headers = document.createElement('div');
    headers.classList.add('guess-headers');

    Object.entries(FIELD_LABELS).forEach(([, labelText]) => {
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
      let displayedValue = formatValue(value, field);

      if (direction === 'up') displayedValue = `↑ ${displayedValue}`;
      if (direction === 'down') displayedValue = `↓ ${displayedValue}`;

      valueElement.textContent = displayedValue;
      tile.appendChild(valueElement);
      row.appendChild(tile);
    }
  );

  headers.after(row);
}
