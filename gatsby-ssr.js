// El HTML estático siempre se genera en español (idioma de reserva de i18n).
// El idioma real se decide en el navegador: `Layout` actualiza `lang` al montar
// y al cambiar de idioma.
export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es" });
};
