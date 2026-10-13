import React from "react";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";

// Banda de llamada a la acción previa al pie. No se muestra en la 404 ni en
// las páginas legales (el Layout lo decide con `showCta`).
const CtaBand = () => {
  const { t } = useNx();
  const { open } = useDialog();

  return (
    <section className="nx-cta nx-container" id="contacto" aria-labelledby="nx-cta-title">
      <h2 className="nx-cta__title" id="nx-cta-title">
        <span>{t("cta.t1")}</span> <span className="nx-accent-coral">{t("cta.t2")}</span>{" "}
        <span>{t("cta.t3")}</span>
      </h2>
      <div className="nx-cta__side">
        <p className="nx-cta__text">{t("cta.text")}</p>
        <button className="nx-btn nx-btn--coral" type="button" onClick={() => open("nx-quote")}>
          {t("button.getquote")}
        </button>
      </div>
    </section>
  );
};

export default CtaBand;
