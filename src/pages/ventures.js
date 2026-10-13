import React from "react";
import { graphql, Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { prepareCmsHtml } from "../utils/content";

// Anchos reales de cada hueco (contenedor de 1320 px).
const SIZES_CARD = "(min-width: 1320px) 608px, (min-width: 640px) 48vw, 100vw";
const SIZES_SIDE = "(min-width: 1320px) 520px, (min-width: 960px) 40vw, 100vw";

const html = (node) => (node && node.childMarkdownRemark && node.childMarkdownRemark.html) || "";

// Página de servicios ("Servicios" en el menú; la ruta sigue siendo /ventures). Lista los mismos
// servicios de DatoCMS (`Technology`) que el inicio y el pie, cada uno con enlace a su página: un solo
// catálogo. "Cotizar" abre el diálogo de cotización con el servicio precargado.
const Service = ({ item }) => {
  const { t } = useNx();
  const { open } = useDialog();
  const short = html(item.shortDescriptionNode);

  return (
    <li className="nx-card nx-venture">
      <Media
        image={item.coverImage}
        fallbackAlt={item.title}
        ratio="3x2"
        sizes={SIZES_CARD}
        className="nx-media--lg nx-media--blur"
      />
      <div className="nx-venture__body">
        {item.shortTitle && <span className="nx-mono">{item.shortTitle}</span>}
        <h2 className="nx-h3">{item.title}</h2>
        {short && (
          <div
            className="nx-prose nx-prose--sm"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(short) }}
          />
        )}
        <div className="nx-form__actions">
          <Link
            className="nx-btn nx-btn--ghost nx-btn--sm"
            to={`/${item.slug}`}
            aria-label={`${t("a11y.readMoreAbout")} ${item.title}`}
          >
            <span>{t("button.readmore")}</span> <span aria-hidden="true">→</span>
          </Link>
          <button
            className="nx-btn nx-btn--coral nx-btn--sm"
            type="button"
            aria-label={`${t("button.quote")}: ${item.title}`}
            onClick={() => open("nx-quote", item.title)}
          >
            {t("button.quote")}
          </button>
        </div>
      </div>
    </li>
  );
};

const Ventures = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const seo = data[`dataSEO_${L}`];
  const page = data[`venture_${L}`];
  const welcome = html(page.welcomeNode);
  const services = data[`services_${L}`].edges;

  return (
    <Layout>
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
        {services.length ? (
          <ul className="nx-grid nx-grid--2">
            {services.map(({ node }) => (
              <Service key={node.id} item={node} />
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
  fragment NxVenturePage on DatoCmsVenture {
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
  }

  fragment NxServiceCard on DatoCmsTechnology {
    id
    slug
    title
    shortTitle
    shortDescriptionNode {
      childMarkdownRemark {
        html
      }
    }
    coverImage {
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
      ...NxVenturePage
    }
    venture_es: datoCmsVenture(locale: { eq: "es" }) {
      ...NxVenturePage
    }
    services_en: allDatoCmsTechnology(filter: { locale: { eq: "en" } }, sort: { fields: originalId, order: ASC }) {
      edges {
        node {
          ...NxServiceCard
        }
      }
    }
    services_es: allDatoCmsTechnology(filter: { locale: { eq: "es" } }, sort: { fields: originalId, order: ASC }) {
      edges {
        node {
          ...NxServiceCard
        }
      }
    }
  }
`;
