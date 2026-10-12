import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withTrans } from "../i18n/withTrans";
import { useTranslation } from "react-i18next";
import Header from "./header";
import Footer from "./footer";
import CtaBand from "./ctaBand";
import QuoteDialog from "./quoteDialog";
import NewsletterDialog from "./newsletterDialog";
import { DialogProvider } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";

// Hojas del rediseño. Los tokens van en :root y el reset está acotado a
// .nx-root, que gatsby-ssr.js pone en <body>.
import "../styles/fonts.css";
import "../styles/nx.css";

// Estructura de todas las páginas (SPEC, "Mapa de portado"): enlace para saltar
// al contenido, cabecera, <main>, banda de cotización + pie (fuera de <main>) y
// los diálogos globales. Lo marcado con data-nx-page queda inerte mientras hay
// un diálogo abierto. `showCta={false}` quita la banda (404 y páginas legales).
// `dialogs`: diálogos propios de una página; van aquí, FUERA de <main>, porque lo que está
// dentro de data-nx-page queda inerte (el diálogo no se podría usar) y dentro del proveedor.
const Layout = ({ children, dialogs = null, showCta = true }) => {
  const { t } = useNx();
  const { i18n } = useTranslation();

  // El HTML estático trae lang="es" (gatsby-ssr.js); aquí se ajusta al idioma real.
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <DialogProvider>
      <a className="nx-skip" href="#nx-main">
        {t("a11y.skip")}
      </a>
      <Header />
      <main id="nx-main" data-nx-page tabIndex={-1}>
        {children}
      </main>
      <div className="nx-band" data-nx-page>
        {showCta && <CtaBand />}
        <Footer />
      </div>
      <QuoteDialog />
      <NewsletterDialog />
      {dialogs}
    </DialogProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  dialogs: PropTypes.node,
  showCta: PropTypes.bool,
};

export default withTrans(Layout);
