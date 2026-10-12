import React from "react";
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL } from "../config/site";

// Correo que se muestra si falla un formulario (ver CONTACT_EMAIL en config/site.js). Sin
// él, el mensaje sale sin dirección.

// `i18nKey` es la clave del texto sin correo (p. ej. "contact.errorText"). La
// versión con correo es la misma clave + "WithEmail": una frase que termina justo
// antes de la dirección; el enlace y el punto final los pone este componente.
// (Se evita <Trans>: arrastra un parser de HTML que pesa más que todo esto.)
const ContactErrorText = ({ i18nKey }) => {
  const { t } = useTranslation();

  if (!CONTACT_EMAIL) {
    return <>{t(i18nKey)}</>;
  }

  return (
    <>
      {t(`${i18nKey}WithEmail`)}{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </>
  );
};

export default ContactErrorText;
