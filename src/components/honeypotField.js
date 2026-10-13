import React from "react";

// Campo trampa para bots (honeypot de Netlify Forms, ver src/utils/netlifyForm.js).
// Una persona nunca lo ve ni lo rellena; un bot que rellene todos los campos de la
// página, sí. Sin texto de etiqueta a propósito: ese texto acabaría en el HTML estático
// de la página y los buscadores lo leerían como contenido.
//
// Va con `display: none`, no fuera de pantalla: el autorrelleno del navegador y los
// gestores de contraseñas SÍ rellenan campos colocados fuera de pantalla (con
// `left: -9999px`), y entonces `submitNetlifyForm` descarta el envío de una persona real
// creyendo que es un bot (el formulario dice "enviado" y no llega nada). Los
// `data-*` piden además a los gestores más comunes que lo ignoren.
const HIDDEN_STYLE = { display: "none" };

const HoneypotField = ({ value, onChange }) => (
  <div aria-hidden="true" style={HIDDEN_STYLE}>
    <input
      type="text"
      name="bot-field"
      value={value || ""}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
      data-lpignore="true"
      data-1p-ignore="true"
      data-bwignore="true"
      data-form-type="other"
    />
  </div>
);

export default HoneypotField;
