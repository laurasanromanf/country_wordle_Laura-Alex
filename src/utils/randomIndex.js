export function getDailyRandomIndex(maxLimit) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Crea un número único para el día de hoy (ej: 20261026)
  const seed = year * 10000 + month * 100 + day;

  // Usa trigonometría para generar una pseudo-aleatoriedad basada en la semilla
  const x = Math.sin(seed) * 10000;
  const decimal = x - Math.floor(x);

  // Devuelve un índice entero dentro del límite de tu lista de países
  return Math.floor(decimal * maxLimit);
}
