import React from "react";
import { useNx } from "../hooks/useNx";
import { formatDate } from "../utils/content";
import { LEGAL_UPDATED } from "../config/site";

// Cabecera de términos y privacidad: título y fecha de los textos.
const LegalHead = ({ title }) => {
  const { t, lang } = useNx();
  return (
    <section
      className="nx-page-head nx-container nx-container--narrow"
      aria-labelledby="nx-legal-title"
    >
      <h1 className="nx-h1" id="nx-legal-title">
        {title}
      </h1>
      <p className="nx-mono">
        {t("legal.updated")}: <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED, lang)}</time>
      </p>
    </section>
  );
};

export default LegalHead;
