import React from "react";

// Iconos SVG en línea (SPEC a.4: trazo 2, extremos redondeados, decorativos).
// Los iconos sociales de la muestra van rellenos (fill) salvo Instagram.
const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M20 6L9 17l-5-5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  facebook: (
    <path
      d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <path
      d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v2a4 4 0 0 1 7 2v8h-4v-7a2 2 0 0 0-4 0v7h-4z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" />,
  whatsapp: (
    <>
      <path d="M4 20l1.3-3.8A8 8 0 1 1 8.2 19z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" fill="currentColor" stroke="none" />
    </>
  ),
};

const Icon = ({ name, size = 20, className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {PATHS[name] || PATHS.external}
  </svg>
);

// Icono de una red social a partir de un texto (p. ej. `SocialProfile.profileType`
// o el dominio de una URL). Lo que no se reconoce usa el icono de enlace externo.
export const socialIconName = (value) => {
  const v = String(value || "").toLowerCase();
  if (v.includes("facebook")) return "facebook";
  if (v.includes("linkedin")) return "linkedin";
  if (v.includes("instagram")) return "instagram";
  if (v === "x" || v.includes("twitter") || v.includes("x.com")) return "x";
  if (v.includes("whatsapp")) return "whatsapp";
  return "external";
};

export default Icon;
