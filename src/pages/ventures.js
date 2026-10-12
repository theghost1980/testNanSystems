import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import Dialog from "../components/dialog";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { isPlaceholder, prepareCmsHtml } from "../utils/content";

// Anchos reales de cada hueco (contenedor de 1320 px).
const SIZES_CARD = "(min-width: 1320px) 608px, (min-width: 640px) 48vw, 100vw";
const SIZES_SIDE = "(min-width: 1320px) 520px, (min-width: 960px) 40vw, 100vw";
const SIZES_DIALOG = "(min-width: 800px) 720px, 100vw";

const html = (node) => (node && node.childMarkdownRemark && node.childMarkdownRemark.html) || "";

// Tarjeta de proyecto. Con texto completo en el CMS ofrece "Leer más" (diálogo); si el campo
// solo trae relleno ("Lorem ipsum"), ofrece directamente cotizar con el título precargado.
const Venture = ({ item, index }) => {
  const { t } = useNx();
  const { open } = useDialog();
  const short = html(item.shortDescriptionNode);
  const hasDetail = !isPlaceholder(html(item.contentNode));
  const label = isPlaceholder(item.shotTitle)
    ? `${t("ventures.project")} ${String(index + 1).padStart(2, "0")}`
    : item.shotTitle;

  return (
    <li className="nx-card nx-venture">
      <Media
        image={item.imageVenture}
        fallbackAlt={item.title}
        ratio="3x2"
        sizes={SIZES_CARD}
        className="nx-media--lg nx-media--blur"
      />
      <div className="nx-venture__body">
        <span className="nx-mono">{label}</span>
        <h2 className="nx-h3">{item.title}</h2>
        {short && (
          <div
            className="nx-prose nx-prose--sm"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(short) }}
          />
        )}
        <div className="nx-form__actions">
          {hasDetail ? (
            <button
              className="nx-btn nx-btn--ghost nx-btn--sm"
              type="button"
              aria-label={`${t("a11y.readMoreAbout")} ${item.title}`}
              onClick={() => open("nx-venture", item.id)}
            >
              <span>{t("button.readmore")}</span> <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button
              className="nx-btn nx-btn--ghost nx-btn--sm"
              type="button"
              aria-label={`${t("button.getquote")}: ${item.title}`}
              onClick={() => open("nx-quote", item.title)}
            >
              {t("button.getquote")}
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

// Detalle del proyecto. "Cotizar" abre el diálogo de cotización en su lugar (con el título
// del proyecto); al cerrarlo, el foco vuelve a la tarjeta que abrió el detalle.
const VentureDialog = ({ items }) => {
  const { t } = useNx();
  const { id, detail, open, close } = useDialog();
  const item = id === "nx-venture" ? items.find((v) => v.id === detail) : null;

  return (
    <Dialog id="nx-venture" kicker={t("ventures.dialogTitle")} title={item ? item.title : ""}>
      {item && (
        <>
          <Media
            image={item.imageVenture}
            fallbackAlt={item.title}
            ratio="3x2"
            sizes={SIZES_DIALOG}
            className="nx-media--lg nx-media--blur"
          />
          <div
            className="nx-prose"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(html(item.contentNode)) }}
          />
          <div className="nx-form__actions">
            <button
              className="nx-btn nx-btn--coral"
              type="button"
              onClick={() => open("nx-quote", item.title)}
            >
              {t("button.getquote")}
            </button>
            <button className="nx-btn nx-btn--ghost" type="button" onClick={close}>
              {t("button.close")}
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
};

const Ventures = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const seo = data[`dataSEO_${L}`];
  const page = data[`venture_${L}`];
  const welcome = html(page.welcomeNode);
  const items = page.itemVenture;

  return (
    <Layout dialogs={<VentureDialog items={items} />}>
      {seo && <HelmetDatoCms seo={seo.seoMetaTags} />}
      <section className="nx-page-head nx-container" aria-labelledby="nx-v-title">
        <div className="nx-two-col nx-two-col--rev">
          <div className="nx-stack">
            <h1 className="nx-h1" id="nx-v-title">
              {t("menu.ventures")}
            </h1>
            {welcome && (
              <div
                className="nx-prose nx-prose--lg"
                dangerouslySetInnerHTML={{ __html: prepareCmsHtml(welcome) }}
              />
            )}
          </div>
          <Media
            image={page.sidePicture}
            fallbackAlt={t("menu.ventures")}
            ratio="4x5"
            sizes={SIZES_SIDE}
            priority
            className="nx-media--card nx-media--blur"
          />
        </div>
      </section>
      <section
        className="nx-section nx-section--tight nx-container"
        aria-label={t("menu.ventures")}
      >
        {items.length ? (
          <ul className="nx-grid nx-grid--2">
            {items.map((item, i) => (
              <Venture key={item.id} item={item} index={i} />
            ))}
          </ul>
        ) : (
          <p className="nx-empty">{t("ventures.empty")}</p>
        )}
      </section>
    </Layout>
  );
};

export default Ventures;

export const data = graphql`
  fragment NxVenture on DatoCmsVenture {
    welcomeNode {
      childMarkdownRemark {
        html
      }
    }
    sidePicture {
      alt
      focalPoint {
        x
        y
      }
      fluid(maxWidth: 640) {
        ...GatsbyDatoCmsFluid
      }
    }
    itemVenture {
      id
      shotTitle
      title
      shortDescriptionNode {
        childMarkdownRemark {
          html
        }
      }
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      imageVenture {
        alt
        focalPoint {
          x
          y
        }
        fluid(maxWidth: 800) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }

  query {
    dataSEO_en: datoCmsSeoVenture(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsSeoVenture(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    venture_en: datoCmsVenture(locale: { eq: "en" }) {
      ...NxVenture
    }
    venture_es: datoCmsVenture(locale: { eq: "es" }) {
      ...NxVenture
    }
  }
`;
