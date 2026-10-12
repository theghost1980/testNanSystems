import { A11Y_WIDGET_ENABLED } from "./src/config/site";

// Menú de accesibilidad de Equalweb (script de un tercero, con integridad SRI). Está desactivado:
// para reactivarlo, poner A11Y_WIDGET_ENABLED = true en src/config/site.js.
// (La versión anterior de este archivo, con un fragmento de pruebas, está en el historial de git.)
export const onClientEntry = () => {
  if (!A11Y_WIDGET_ENABLED) return;

  window.onload = () => {
    // Accessibility Code for "nansystems.us"
    window.interdeal = { "sitekey": "67c09cc04249ffabeb49f8f4bebbf5e8", "Position": "Right", "Menulang": "EN", "domains": { "js": "https://cdn.equalweb.com/", "acc": "https://access.equalweb.com/" }, "btnStyle": { "vPosition": [ "80%", null ], "scale": [ "0.6", "0.6" ], "color": { "main": "#1876c9", "second": "" }, "icon": { "type": 14, "shape": "semicircle", "outline": false } } }; (function(doc, head, body){ var coreCall = doc.createElement('script'); coreCall.src = 'https://cdn.equalweb.com/core/3.0.0/accessibility.js'; coreCall.defer = true; coreCall.integrity = 'sha512-Z/Fp/le5EMHTTNnZV1RBa6aoSrTkOjXLSdL6nHqG8c70vKlDKjeuUCs7l5Nxt66oSkEnlcZAX6gUUNqjhN9Hew=='; coreCall.crossOrigin = 'anonymous'; coreCall.setAttribute('data-cfasync', true ); body? body.appendChild(coreCall) : head.appendChild(coreCall); })(document, document.head, document.body);
  };
};
