import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import LegalHead from "../components/legalHead";
import { useNx } from "../hooks/useNx";

const Privacy = () => {
  const { t } = useNx();

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.privacy")} />
      <LegalHead title={t("privacy.l1")} />
      <div className="nx-section nx-section--tight nx-container nx-container--narrow">
        <div className="nx-prose nx-prose--lg">
          <p>
            {t("privacy.l2-1")}
            <a href="https://nansystems.us">https://nansystems.us</a>
            {t("privacy.l2-2")}
          </p>
          <p>{t("privacy.l3")}</p>
          <p>{t("privacy.l4")}</p>
          <p>{t("privacy.l5")}</p>
          <p>{t("privacy.l6")}</p>
          <p>{t("privacy.l7")}</p>
          <p>{t("privacy.l8")}</p>
          <p>
            <em>{t("privacy.l9")}</em>
          </p>
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
