import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import LegalHead from "../components/legalHead";
import LegalToc from "../components/legalToc";
import { useNx } from "../hooks/useNx";

// Textos en las traducciones (tos.*). Cada sección es [clave del título, clave del texto]; la numeración
// ("1.", "2."…) la pone la página, así que los títulos del archivo de traducciones no la llevan.
const SECTIONS = [
  ["tos.l2", "tos.l3"],
  ["tos.l4", "tos.l5"], // tiene además la lista de restricciones y el aviso del generador
  ["tos.l12", "tos.l13"],
  ["tos.l14", "tos.l15"],
  ["tos.l16", "tos.l17"],
  ["tos.l18", "tos.l19"],
  ["tos.l26", "tos.l27"],
  ["tos.l28", "tos.l29"],
  ["tos.l20", "tos.l21"],
  ["tos.l22", null], // el texto lleva un enlace a la política de privacidad
  ["tos.l24", "tos.l25"],
];

const Tos = () => {
  const { t } = useNx();

  const extra = (i) => {
    if (i === 1) {
      return (
        <>
          <ul>
            {["l6", "l7", "l8", "l9", "l10"].map((k) => (
              <li key={k}>{t(`tos.${k}`)}</li>
            ))}
          </ul>
          <p>
            {t("tos.l11")}{" "}
            <a href="https://www.termsofservicegenerator.net" rel="noopener noreferrer">
              {t("tos.l11-1")}
            </a>{" "}
            {t("tos.l11-2")}{" "}
            <a href="https://www.generateprivacypolicy.com" rel="noopener noreferrer">
              {t("tos.l11-3")}
            </a>
            .
          </p>
        </>
      );
    }
    return null;
  };

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.tos")} />
      <LegalHead title={t("tos.l1")} />
      <div className="nx-section nx-section--tight nx-container nx-container--narrow nx-stack nx-stack--lg">
        <LegalToc items={SECTIONS.map(([title], i) => ({ id: `t${i + 1}`, label: t(title) }))} />
        <div className="nx-prose nx-prose--lg">
          {SECTIONS.map(([title, text], i) => (
            <React.Fragment key={title}>
              <h2 id={`t${i + 1}`}>
                {i + 1}. {t(title)}
              </h2>
              {text ? (
                <p>{t(text)}</p>
              ) : (
                <p>
                  {t("tos.l23")} <Link to="/privacy">{t("tos.l23-1")}</Link>.
                </p>
              )}
              {extra(i)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tos;
