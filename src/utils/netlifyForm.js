// Envía un formulario a Netlify Forms. El formulario debe estar declarado en
// static/forms.html (mismo nombre y mismos campos). Igual que el boletín
// (src/components/mailChimpForm.js).
const encode = (fields) =>
  Object.keys(fields)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(fields[key]))
    .join("&");

export const submitNetlifyForm = async (formName, fields) => {
  const response = await fetch("/?no-cache=1", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, ...fields }),
  });

  // fetch solo rechaza ante fallos de red: un 4xx/5xx de Netlify llegaría
  // aquí como si fuera un éxito.
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
};
