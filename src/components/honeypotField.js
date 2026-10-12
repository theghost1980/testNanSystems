import React from "react";

// Campo trampa para bots (honeypot de Netlify Forms, ver src/utils/netlifyForm.js).
// Está fuera de pantalla y fuera del orden de tabulación: una persona nunca lo
// ve ni lo rellena; un bot que rellene todos los campos de la página, sí.
// Sin texto de etiqueta a propósito: ese texto acabaría en el HTML estático de
// la página y los buscadores lo leerían como contenido.
const HIDDEN_STYLE = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

const HoneypotField = ({ value, onChange }) => (
  <div aria-hidden="true" style={HIDDEN_STYLE}>
    <input
      type="text"
      name="bot-field"
      value={value || ""}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
    />
  </div>
);

export default HoneypotField;
