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

// Minutos de lectura de un BlogPost (`timeToRead` no es campo del registro: se pide por
// contentNode.childMarkdownRemark). 0 si no hay contenido.
export const readMinutes = (node) =>
  (node &&
    node.contentNode &&
    node.contentNode.childMarkdownRemark &&
    node.contentNode.childMarkdownRemark.timeToRead) ||
  0;

// Textos de relleno que el CMS trae de fábrica o que quedaron de pruebas ("Lorem ipsum",
// "Ipsem Lorem", la nota interna de los logros). No deben llegar al público: lo que los
// contenga se trata como vacío hasta que se escriba el texto real en DatoCMS.
const PLACEHOLDER_RE = /lorem\s+ipsum|ipsem\s+lorem|place here all the|recommended for ana/i;
const stripTags = (html) => String(html || "").replace(/<[^>]+>/g, " ");

export const isPlaceholder = (text) => {
  const s = stripTags(text).trim();
  return !s || PLACEHOLDER_RE.test(s);
};

// Texto plano en minúsculas y sin espacios repetidos, para comparar bloques.
const plainText = (html) =>
  stripTags(html).replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().toLowerCase();

// Bloques de texto del CMS que sí aportan: sin relleno, sin repetir el título ni otro bloque
// ya incluido. [{ key, html }] → los mismos objetos filtrados, en el mismo orden.
export const usefulBlocks = (blocks, title) => {
  const seen = new Set([plainText(title)]);
  return blocks.filter(({ html }) => {
    if (isPlaceholder(html)) return false;
    const key = plainText(html);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// HTML crudo del CMS (remark sin plugins) → listo para `.nx-prose` (SPEC j.3 y j.4):
// - un solo h1 por página: los h1 del contenido bajan a h2 (el estilo ya los iguala);
// - las celdas de cabecera de tabla reciben scope="col" (remark GFM no lo pone);
// - los bloques `pre` y las tablas se desplazan en horizontal (CSS): con tabindex="0" se pueden
//   recorrer con el teclado.
export const prepareCmsHtml = (html) =>
  String(html || "")
    .replace(/<(\/?)h1(\s[^>]*)?>/g, "<$1h2$2>")
    .replace(/<th(\s[^>]*)?>/g, (m, attrs = "") =>
      /\sscope=/.test(attrs) ? m : `<th scope="col"${attrs}>`
    )
    .replace(/<(pre|table)(\s[^>]*)?>/g, (m, tag, attrs = "") =>
      /\stabindex=/.test(attrs) ? m : `<${tag} tabindex="0"${attrs}>`
    );

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
