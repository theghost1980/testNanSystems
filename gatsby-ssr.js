import React from "react";
import { A11Y_WIDGET_ENABLED } from "./src/config/site";

// Lo que debe estar en el HTML estático para que la primera pintura salga bien
// (sin parpadeo de fondo ni de tema) — SPEC del rediseño, k.5.

// Tema antes de pintar: si hay preferencia guardada se pone `data-theme`; si no,
// el CSS sigue `prefers-color-scheme` por sí solo (también sin JavaScript).
const THEME_SCRIPT =
  "(function(){try{var t=localStorage.getItem('nan-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();";

// Fundido de las imágenes locales (`img.nx-fade`, ver media.js y nx.css): marca la imagen como cargada cuando
// termina (el evento `load` no burbujea, de ahí la captura en `document`) y revisa las que ya estaban en caché.
const FADE_SCRIPT =
  "(function(){function ok(i){i.classList.add('nx-is-loaded');}document.addEventListener('load',function(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.classList&&t.classList.contains('nx-fade')){ok(t);}},true);document.addEventListener('DOMContentLoaded',function(){var l=document.querySelectorAll('img.nx-fade');for(var k=0;k<l.length;k++){if(l[k].complete&&l[k].naturalWidth){ok(l[k]);}}});})();";

// Pesos de Plus Jakarta Sans que se ven en la primera pantalla (ver static/fonts/).
const PRELOAD_FONTS = [
  "plus-jakarta-sans-latin-400",
  "plus-jakarta-sans-latin-600",
  "plus-jakarta-sans-latin-800",
];

export const onRenderBody = ({
  setHtmlAttributes,
  setBodyAttributes,
  setHeadComponents,
}) => {
  // El HTML estático siempre se genera en español (idioma de reserva de i18n).
  // El idioma real se decide en el navegador: `Layout` actualiza `lang` al montar
  // y al cambiar de idioma.
  setHtmlAttributes({ lang: "es" });
  // `.nx-root` va en <body> para que el reset acotado de nx.css cubra también el
  // margen del body y el fondo.
  // `nx-has-a11y` (solo con el widget de accesibilidad activo) reserva espacio junto al botón de la banda.
  setBodyAttributes({ className: A11Y_WIDGET_ENABLED ? "nx-root nx-has-a11y" : "nx-root" });
  setHeadComponents([
    <meta key="nx-color-scheme" name="color-scheme" content="light dark" />,
    <script key="nx-theme" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />,
    <script key="nx-fade" dangerouslySetInnerHTML={{ __html: FADE_SCRIPT }} />,
    <noscript key="nx-fade-nojs">
      <style>{"img.nx-fade{opacity:1!important}"}</style>
    </noscript>,
    ...PRELOAD_FONTS.map((name) => (
      <link
        key={name}
        rel="preload"
        href={`/fonts/${name}.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    )),
  ]);
};
