import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import LegalHead from "../components/legalHead";
import LegalToc from "../components/legalToc";
import { useNx } from "../hooks/useNx";

// Lo que el sitio guarda en el navegador: [nombre, clave del texto]. Los nombres no se traducen.
const STORAGE = [
  ["nan-theme", "privacy.s3-theme"],
  ["i18nextLng", "privacy.s3-lang"],
  ["nx-form-sends-contact, nx-form-sends-quote, nx-form-sends-newsletter", "privacy.s3-limit"],
];

const Privacy = () => {
  const { t } = useNx();
  const sections = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.privacy")} />
      <LegalHead title={t("privacy.l1")} />
      <div className="nx-section nx-section--tight nx-container nx-container--narrow nx-stack nx-stack--lg">
        <LegalToc items={sections.map((s, i) => ({ id: `p${i + 1}`, label: t(`privacy.${s}`) }))} />
        <div className="nx-prose nx-prose--lg">
          <p>{t("privacy.intro")}</p>

          <h2 id="p1">1. {t("privacy.s1")}</h2>
          <p>{t("privacy.s1-intro")}</p>
          <ul>
            <li>{t("privacy.s1-contact")}</li>
            <li>{t("privacy.s1-quote")}</li>
            <li>{t("privacy.s1-news")}</li>
            <li>{t("privacy.s1-tech")}</li>
          </ul>
          <p>{t("privacy.s1-note")}</p>

          <h2 id="p2">2. {t("privacy.s2")}</h2>
          <p>{t("privacy.s2-intro")}</p>
          <ul>
            <li>{t("privacy.s2-netlify")}</li>
            <li>{t("privacy.s2-dato")}</li>
            <li>{t("privacy.s2-eq")}</li>
          </ul>
          <p>{t("privacy.s2-end")}</p>

          <h2 id="p3">3. {t("privacy.s3")}</h2>
          <p>{t("privacy.s3-intro")}</p>
          <ul>
            {STORAGE.map(([name, key]) => (
              <li key={name}>
                <code>{name}</code>: {t(key)}
              </li>
            ))}
          </ul>
          <p>{t("privacy.s3-eq")}</p>
          <p>{t("privacy.s3-none")}</p>
          <p>{t("privacy.s3-outro")}</p>

          <h2 id="p4">4. {t("privacy.s4")}</h2>
          <p>{t("privacy.s4-text")}</p>

          <h2 id="p5">5. {t("privacy.s5")}</h2>
          <p>
            {t("privacy.s5-a")}
            <Link to="/contact">{t("privacy.s5-link")}</Link>
            {t("privacy.s5-b")}
          </p>

          <h2 id="p6">6. {t("privacy.s6")}</h2>
          <p>{t("privacy.s6-text")}</p>

          <h2 id="p7">7. {t("privacy.s7")}</h2>
          <p>{t("privacy.s7-text")}</p>

          <h2 id="p8">8. {t("privacy.s8")}</h2>
          <p>{t("privacy.s8-text")}</p>

          <p className="nx-small">
            <a href="https://getterms.io" title="Generate a free privacy policy" rel="noopener noreferrer">
              {t("privacy.l10")}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
