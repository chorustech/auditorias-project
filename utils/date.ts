export function getWeekNumber(date: Date = new Date()): string {
  // Copiamos la fecha para no mutar la original
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  // ISO: jueves = semana clave
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);

  // Primer día del año
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Cálculo de la semana
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  // Formato 01, 02, 03...
  return String(weekNo).padStart(2, "0");
}

export const getDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
};
