import React from "react";

// Lo que debe estar en el HTML estático para que la primera pintura salga bien
// (sin parpadeo de fondo ni de tema) — SPEC del rediseño, k.5.

// Tema antes de pintar: si hay preferencia guardada se pone `data-theme`; si no,
// el CSS sigue `prefers-color-scheme` por sí solo (también sin JavaScript).
const THEME_SCRIPT =
  "(function(){try{var t=localStorage.getItem('nan-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();";

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
  setBodyAttributes({ className: "nx-root" });
  setHeadComponents([
    <meta key="nx-color-scheme" name="color-scheme" content="light dark" />,
    <script key="nx-theme" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />,
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
