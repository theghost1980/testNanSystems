import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

const Tos = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="tosCont">
        <h2 className="titleTos centerTextTos">{t("tos.l1")}</h2>
        <h3 className="subtitleTos">{t("tos.l2")}</h3>
        <p className="textTos">{t("tos.l3")}</p>
        <h3 className="subtitleTos">{t("tos.l4")}</h3>
        <p className="textTos">{t("tos.l5")}</p>
        <ul className="textTos">
          <li>{t("tos.l6")}</li>
          <li>{t("tos.l7")}</li>
          <li>{t("tos.l8")}</li>
          <li>{t("tos.l9")}</li>
          <li>{t("tos.l10")}</li>
        </ul>
        <p className="textTos miniText">
          {t("tos.l11")}
          <a href="https://www.termsofservicegenerator.net">{t("tos.l11-1")}</a>
          &nbsp; {t("tos.l11-2")} &nbsp;{" "}
          <a href="https://www.generateprivacypolicy.com">{t("tos.l11-3")}</a>.
        </p>
        <h3 className="subtitleTos">{t("tos.l12")}</h3>
        <p className="textTos">{t("tos.l13")}</p>
        <h3 className="subtitleTos">{t("tos.l14")}</h3>
        <p className="textTos">{t("tos.l15")}</p>
        <h3 className="subtitleTos">{t("tos.l16")}</h3>
        <p className="textTos">{t("tos.l17")}</p>
        <h3 className="subtitleTos">{t("tos.l18")}</h3>
        <p className="textTos">{t("tos.l19")}</p>
        <h3 className="subtitleTos">{t("tos.l20")}</h3>
        <p className="textTos">{t("tos.l21")}</p>
        <h3 className="subtitleTos">{t("tos.l22")}</h3>
        <p className="textTos">
          {t("tos.l23")} <Link to="/privacy">{t("tos.l23-1")}</Link>.
        </p>
        <h3 className="subtitleTos">{t("tos.l24")}</h3>
        <p className="textTos">{t("tos.l25")}</p>
      </div>
    </Layout>
  );
};

export default Tos;
