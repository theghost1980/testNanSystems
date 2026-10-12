import React from "react";
import { useTranslation } from "react-i18next";
import ContactErrorText from "./contactErrorText";

// Texto de error de un formulario según el motivo (ver errorKind en
// src/utils/netlifyForm.js):
// - "cooldown": acaba de enviar otro; basta con esperar (sin correo).
// - "daily": tope diario; se mostrará el correo de contacto si está configurado.
// - cualquier otro: falló el envío; `sendKey` es la clave del texto de ese formulario.
const FormErrorText = ({ kind, sendKey }) => {
  const { t } = useTranslation();

  if (kind === "cooldown") {
    return <>{t("formLimit.cooldown")}</>;
  }
  if (kind === "daily") {
    return <ContactErrorText i18nKey="formLimit.daily" />;
  }
  return <ContactErrorText i18nKey={sendKey} />;
};

export default FormErrorText;
