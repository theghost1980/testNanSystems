import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import CookieConsent from "react-cookie-consent";
import PropTypes from "prop-types";
import { withTrans } from "../i18n/withTrans";
import { useTranslation } from "react-i18next";
// Rediseño (R1a): hojas nuevas. Son inertes mientras <body> no lleve la clase
// "nx-root" (los tokens van en :root y el reset está acotado a .nx-root).
import "../styles/fonts.css";
import "../styles/nx.css";

const Layout = (props) => {
  const { t, i18n } = useTranslation();

  // El HTML estático trae lang="es" (gatsby-ssr.js); aquí se ajusta al idioma real.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="layoutContainer">
      <div className="content">
        <Header />
        <div className="dataContainer">{props.children}</div>
      </div>
      <div className="cookiesConsentCont">
        <CookieConsent
          location="bottom"
          buttonText={t("cookies.msg")}
          declineButtonText="Decline"
          cookieName="gatsby-gdpr-google-analytics"
          buttonStyle={{
            color: "#4e503b",
            fontSize: "15px",
            fontFamily: "var(--var-font-subtitles)",
            fontWeight: "bold",
          }}
        >
          {t("cookies.title")}.<br></br>
          <span style={{ fontSize: "10px" }}>{t("cookies.sub_title")}</span>
        </CookieConsent>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withTrans(Layout);
