/**
 * Reloj digital en tiempo real para la barra superior.
 * Muestra fecha (abreviada en español) y hora actual en formato HH:MM:SS.
 */
const MONTHS_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const pad2 = (n) => String(n).padStart(2, '0');

/**
 * Inicializa la actualización continua del reloj en los elementos DOM provistos.
 * @param {HTMLElement} dateEl - Elemento para la fecha (#clock-date).
 * @param {HTMLElement} timeEl - Elemento para la hora (#clock-time).
 * @returns {() => void} Función para detener el temporizador si se desmonta.
 */
export function initClock(dateEl, timeEl) {
  if (!dateEl || !timeEl) return () => {};

  const tick = () => {
    const now = new Date();
    dateEl.textContent = `${MONTHS_ES[now.getMonth()]} ${pad2(now.getDate())}, ${now.getFullYear()}`;
    timeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}
