import React from "react";
import { useNx } from "../hooks/useNx";

// Índice de una página legal: `items` = [{ id, label }]; los encabezados de la página llevan ese `id`.
const LegalToc = ({ items }) => {
  const { t } = useNx();
  return (
    <nav className="nx-card nx-card--flat nx-card--pad" aria-labelledby="nx-toc-title">
      <h2 className="nx-mono" id="nx-toc-title">
        {t("legal.toc")}
      </h2>
      <ol className="nx-toc nx-mt-sm">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              {i + 1}. {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default LegalToc;
