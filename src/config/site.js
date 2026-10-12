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
