// Datos del negocio que se escriben a mano en el sitio (no vienen del CMS).
// Confirmar con la clienta antes de publicar y actualizar si cambian.

// Año de su primer puesto técnico (soporte informático, febrero de 2015 en el
// portafolio de DatoCMS). Es la base de la cifra "+N años" del inicio. Los
// empleos de 2008 a 2013 (recursos humanos, redes sociales) no cuentan: la cifra
// habla de automatización e IT. Coincide con el "más de 6 años" que decía la web
// en 2020.
export const TECH_CAREER_START_YEAR = 2015;

// Años de experiencia técnica (cifra "+N" del inicio y texto del portafolio).
export const techYears = () => new Date().getFullYear() - TECH_CAREER_START_YEAR;

// Usuario de X que se menciona al compartir un artículo ("via"). Era el que ya tenía el
// botón de compartir anterior; confirmar con la clienta si sigue siendo suyo.
export const SHARE_VIA_HANDLE = "_MsLinda";

// Correo de contacto que se muestra en la página de contacto y en los mensajes de error de los
// formularios. Sale de la variable de entorno GATSBY_CONTACT_EMAIL (.env en local; variables del
// sitio en Netlify, también para Deploy Previews) y se fija al construir. Sin ella no se muestra
// ninguna dirección. No escribir el correo en el repositorio: es público.
export const CONTACT_EMAIL = process.env.GATSBY_CONTACT_EMAIL || "";

// Fecha de la última revisión de los textos legales (términos y privacidad), que se muestra al inicio
// de ambas páginas. Las versiones anteriores eran del 19 de diciembre de 2020; se reescribieron el
// 12 de octubre de 2026. Actualizar cada vez que se revisen.
export const LEGAL_UPDATED = "2026-10-12";

// Certificaciones del CMS que no se muestran en "Sobre nosotros" (no apoyan el perfil de energía, edificios y TI):
// impuestos (H&R Block, IRS) y la de supervisión de exámenes (AMP). Siguen en el CMS; se filtran por el título.
export const HIDDEN_CERTIFICATIONS = /\b(tax|proctor)\b/i;

// Menú de accesibilidad de Equalweb (script de un tercero). Desactivado por decisión del dueño; para
// reactivarlo basta con poner `true`: `gatsby-browser.js` vuelve a cargar el script, la política de
// privacidad vuelve a mencionarlo y el CSS reserva espacio junto al botón de la banda de cotización.
// Si se reactiva, revisar también que Equalweb siga figurando en los créditos del CMS.
export const A11Y_WIDGET_ENABLED = false;
