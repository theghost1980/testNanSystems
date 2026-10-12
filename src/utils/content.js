// Utilidades de datos del rediseño (SPEC, "Utilidades de datos").

// "NaNSYSTEMS,  testing, netlify build" → ["NaNSYSTEMS", "testing", "netlify build"] (máx. 3)
export const parseCategories = (str, max = 3) =>
  String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);

// focalPoint { x: 0.62, y: 0.35 } → "62% 35%" (para object-position)
export const focalToPosition = (fp) => {
  const x = fp && typeof fp.x === "number" ? fp.x : 0.5;
  const y = fp && typeof fp.y === "number" ? fp.y : 0.5;
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
};

// Texto alternativo: el del CMS si existe; si no, el respaldo (p. ej. el título
// del registro). Hoy el `alt` está vacío en el 100 % de las imágenes del CMS.
export const altFor = (image, fallback) =>
  (image && image.alt) || fallback || "";

// Fecha absoluta por idioma (más estable que "hace 3 meses" para SEO y traducción).
// Zona UTC para que el día no se mueva.
export const formatDate = (iso, lang) => {
  const d = new Date(iso);
  if (!iso || isNaN(d)) return iso || "";
  try {
    return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch (e) {
    return String(iso).slice(0, 10);
  }
};
