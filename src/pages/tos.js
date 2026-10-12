import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import LegalHead from "../components/legalHead";
import { useNx } from "../hooks/useNx";

// Los textos están en las traducciones (tos.l1 a tos.l25). Las secciones 1 a 9 llevan ancla (#t1…)
// y el índice de arriba enlaza a ellas.
const SECTIONS = ["tos.l2", "tos.l4", "tos.l12", "tos.l14", "tos.l16", "tos.l18", "tos.l20", "tos.l22", "tos.l24"];

const Tos = () => {
  const { t } = useNx();
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9] = SECTIONS;

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.tos")} />
      <LegalHead title={t("tos.l1")} />
      <div className="nx-section nx-section--tight nx-container nx-container--narrow nx-stack nx-stack--lg">
        <nav className="nx-card nx-card--flat nx-card--pad" aria-labelledby="nx-toc-title">
          <h2 className="nx-mono" id="nx-toc-title">
            {t("legal.toc")}
          </h2>
          <ol className="nx-toc nx-mt-sm">
            {SECTIONS.map((key, i) => (
              <li key={key}>
                <a href={`#t${i + 1}`}>{t(key)}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="nx-prose nx-prose--lg">
          <h2 id="t1">{t(s1)}</h2>
          <p>{t("tos.l3")}</p>
          <h2 id="t2">{t(s2)}</h2>
          <p>{t("tos.l5")}</p>
          <ul>
            <li>{t("tos.l6")}</li>
            <li>{t("tos.l7")}</li>
            <li>{t("tos.l8")}</li>
            <li>{t("tos.l9")}</li>
            <li>{t("tos.l10")}</li>
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
          <h2 id="t3">{t(s3)}</h2>
          <p>{t("tos.l13")}</p>
          <h2 id="t4">{t(s4)}</h2>
          <p>{t("tos.l15")}</p>
          <h2 id="t5">{t(s5)}</h2>
          <p>{t("tos.l17")}</p>
          <h2 id="t6">{t(s6)}</h2>
          <p>{t("tos.l19")}</p>
          <h2 id="t7">{t(s7)}</h2>
          <p>{t("tos.l21")}</p>
          <h2 id="t8">{t(s8)}</h2>
          <p>
            {t("tos.l23")} <Link to="/privacy">{t("tos.l23-1")}</Link>.
          </p>
          <h2 id="t9">{t(s9)}</h2>
          <p>{t("tos.l25")}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Tos;
