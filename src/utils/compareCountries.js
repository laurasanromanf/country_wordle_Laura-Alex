export function normalizeCountryName(name) {
  return String(name ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function compareText(value, targetValue) {
  return normalizeCountryName(value) === normalizeCountryName(targetValue)
    ? 'green'
    : 'gray';
}

function compareNumber(value, targetValue) {
  if (
    typeof value !== 'number' ||
    typeof targetValue !== 'number' ||
    !Number.isFinite(value) ||
    !Number.isFinite(targetValue)
  ) {
    return { color: 'gray' };
  }

  if (value === targetValue) {
    return { color: 'green' };
  }

  return {
    color: 'gray',
    direction: value < targetValue ? 'up' : 'down',
  };
}

function getFlagColors(country) {
  const palette = country.flag?.colors?.palette;

  if (!Array.isArray(palette)) {
    return [];
  }

  return [
    ...new Set(
      palette.map((color) => color.hex?.trim().toLowerCase()).filter(Boolean)
    ),
  ];
}

function compareFlagColors(attempted, target) {
  const attemptedColors = getFlagColors(attempted);
  const targetColors = getFlagColors(target);

  if (!attemptedColors.length || !targetColors.length) {
    return 'gray';
  }

  const commonColors = attemptedColors.filter((color) =>
    targetColors.includes(color)
  );

  if (
    attemptedColors.length === targetColors.length &&
    commonColors.length === targetColors.length
  ) {
    return 'green';
  }

  return commonColors.length > 0 ? 'orange' : 'gray';
}

export function compareCountries(target, attempted, attemptedName) {
  const attemptedCoastal = attempted.landlocked === false;
  const targetCoastal = target.landlocked === false;

  const areaComparison = compareNumber(
    attempted.area?.kilometers,
    target.area?.kilometers
  );

  const populationComparison = compareNumber(
    attempted.population,
    target.population
  );

  return [
    {
      field: 'name',
      value: attemptedName,
      color:
        normalizeCountryName(attemptedName) ===
        normalizeCountryName(target.name)
          ? 'green'
          : 'gray',
    },
    {
      field: 'region',
      value: attempted.region,
      color: compareText(attempted.region, target.region),
    },
    {
      field: 'area',
      value: attempted.area?.kilometers ?? null,
      ...areaComparison,
    },
    {
      field: 'flagColors',
      value: getFlagColors(attempted),
      color: compareFlagColors(attempted, target),
    },
    {
      field: 'coastal',
      value: attemptedCoastal ? 'Sí' : 'No',
      color: attemptedCoastal === targetCoastal ? 'green' : 'gray',
    },
    {
      field: 'population',
      value: attempted.population ?? null,
      ...populationComparison,
    },
  ];
}
