// Envía un formulario a Netlify Forms. El formulario debe estar declarado en
// static/forms.html (mismo nombre y mismos campos).
//
// Antiabuso (lado cliente; frena envíos repetidos, no a quien haga POST directo):
// - Espera mínima entre envíos y tope diario por navegador y formulario.
// - Honeypot: el campo "bot-field" viaja siempre en el POST (Netlify exige que
//   esté en el cuerpo); si viene relleno es un bot y no se envía nada.

// Ajustar aquí los límites.
const COOLDOWN_MS = 60 * 1000; // espera entre dos envíos del mismo formulario
const MAX_PER_DAY = 5; // envíos por formulario y navegador en 24 h
const DAY_MS = 24 * 60 * 60 * 1000;

const storageKey = (formName) => `nx-form-sends-${formName}`;

// Marcas de tiempo de los envíos correctos de las últimas 24 h. Si localStorage
// no está disponible (modo privado, bloqueado) no se aplica ningún límite.
const readSends = (formName) => {
  try {
    const list = JSON.parse(
      window.localStorage.getItem(storageKey(formName)) || "[]",
    );
    const now = Date.now();
    return Array.isArray(list)
      ? list.filter((t) => typeof t === "number" && t <= now && now - t < DAY_MS)
      : [];
  } catch (e) {
    return [];
  }
};

const saveSends = (formName, sends) => {
  try {
    window.localStorage.setItem(storageKey(formName), JSON.stringify(sends));
  } catch (e) {
    // sin almacenamiento: sin límite
  }
};

const limitError = (kind) =>
  Object.assign(new Error(`rate-limited:${kind}`), { rateLimit: kind });

// "cooldown" | "daily" si el envío se bloqueó por los límites; "send" si falló
// el envío en sí (red, Netlify...).
export const errorKind = (err) => (err && err.rateLimit) || "send";

const encode = (fields) =>
  Object.keys(fields)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(fields[key]))
    .join("&");

export const submitNetlifyForm = async (formName, fields) => {
  // Honeypot relleno: es un bot. No se envía (así tampoco gasta cuota) y se
  // responde como si hubiera ido bien.
  if (fields["bot-field"]) {
    // Aviso para depurar: si lo ves en una persona real, algo (autorrelleno, extensión) rellenó el campo.
    if (typeof console !== "undefined") console.warn("Formulario no enviado: el campo trampa vino relleno.");
    return;
  }

  const sends = readSends(formName);
  if (sends.length >= MAX_PER_DAY) {
    throw limitError("daily");
  }
  if (sends.length && Date.now() - Math.max(...sends) < COOLDOWN_MS) {
    throw limitError("cooldown");
  }

  const response = await fetch("/?no-cache=1", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, "bot-field": "", ...fields }),
  });

  // fetch solo rechaza ante fallos de red: un 4xx/5xx de Netlify llegaría
  // aquí como si fuera un éxito.
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  // Solo los envíos correctos cuentan para el límite.
  saveSends(formName, [...sends, Date.now()]);
};
