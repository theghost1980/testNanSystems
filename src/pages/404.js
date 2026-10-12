import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import Media from "../components/media";
import Icon from "../components/icons";
import { useNx } from "../hooks/useNx";

// Imagen de concepto del diseño (docs/image-prompts.md), archivo local: ya no se usa
// `InfoSite.notFoundImg` del CMS.
import img404 from "../media-imgs/redesign/404-cable-desconectado.jpg";

const Notfound = () => {
  const { t } = useNx();

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.notfound")} />
      <section className="nx-notfound nx-container" aria-labelledby="nx-404-title">
        <Media
          src={img404}
          width={800}
          height={800}
          alt={t("notfound.alt")}
          ratio="1x1"
          sizes="(min-width: 768px) 420px, 100vw"
          priority
          className="nx-media--card nx-media--blur"
        />
        <div className="nx-stack">
          <span className="nx-mono">{t("notfound.code")}</span>
          <h1 className="nx-h1" id="nx-404-title">
            {t("notfound.title")}
          </h1>
          <p className="nx-lead">{t("notfound.text")}</p>
          <div className="nx-form__actions">
            <Link className="nx-btn nx-btn--primary" to="/">
              <Icon name="back" size={18} /> <span>{t("notfound.back")}</span>
            </Link>
            <Link className="nx-btn nx-btn--ghost" to="/contact">
              {t("menu.contact")}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notfound;
