import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import ReadMore from "../components/readMore";
import Share from "../components/share";
import { useNx } from "../hooks/useNx";
import { isPlaceholder, prepareCmsHtml } from "../utils/content";

// Anchos reales del hueco (contenedor de 1320 px; tres tarjetas desde 960 px; el ítem usa
// dos columnas desde 768 px).
const SIZES_CARD = "(min-width: 1320px) 408px, (min-width: 960px) 30vw, 100vw";
const SIZES_FEATURE = "(min-width: 1320px) 608px, (min-width: 768px) 48vw, 100vw";

const html = (node) => (node && node.childMarkdownRemark && node.childMarkdownRemark.html) || "";

const AboutNew = ({ data, location }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const page = data[`about_${L}`];
  const welcome = html(page.welcomeNode);

  return (
    <Layout>
      <HelmetDatoCms seo={page.seoMetaTags} />
      <section className="nx-page-head nx-container" aria-labelledby="nx-about-title">
        <h1 className="nx-h1" id="nx-about-title">
          {t("menu.about")}
        </h1>
        {welcome && (
          <div
            className="nx-prose nx-prose--lg"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(welcome) }}
          />
        )}
        <Share
          path={location.pathname}
          title={t("menu.about")}
          categories="NaNSYSTEMS, SolutionsIT, automation"
          labelKey="about.share"
        />
      </section>

      {page.aboutarea.length > 0 && (
        <section
          className="nx-section nx-section--tight nx-container"
          aria-labelledby="nx-areas-title"
        >
          <h2 className="nx-h2 nx-mb" id="nx-areas-title">
            {t("about.areas")}
          </h2>
          <ul className="nx-grid nx-grid--3">
            {page.aboutarea.map((area) => (
              <li key={area.id} className="nx-card nx-about-card">
                <Media
                  image={area.image}
                  fallbackAlt={area.title}
                  ratio="1x1"
                  sizes={SIZES_CARD}
                  className="nx-media--lg nx-media--blur"
                />
                <h3 className="nx-about-card__title">{area.title}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}

      {page.itemAboutus.length > 0 && (
        <section className="nx-section nx-container nx-stack nx-stack--lg">
          {page.itemAboutus.map((item, i) => {
            const short = html(item.shortDescriptionNode);
            const more = html(item.contentNode);
            // `shotTitle` y `content` traen hoy texto de relleno en el CMS: sin texto real, la
            // etiqueta es "Área 0N" y no se ofrece "Leer más".
            const label = isPlaceholder(item.shotTitle)
              ? `${t("about.area")} ${String(i + 1).padStart(2, "0")}`
              : item.shotTitle;
            return (
              <article
                key={item.id}
                className={`nx-feature${i % 2 ? " nx-feature--rev" : ""}`}
              >
                <div className="nx-feature__media">
                  <Media
                    image={item.imageVenture}
                    fallbackAlt={item.title}
                    ratio="3x2"
                    sizes={SIZES_FEATURE}
                    className="nx-media--card nx-media--blur"
                  />
                </div>
                <div className="nx-feature__body">
                  <span className="nx-mono">{label}</span>
                  <h2 className="nx-h3">{item.title}</h2>
                  {short && (
                    <div
                      className="nx-prose"
                      dangerouslySetInnerHTML={{ __html: prepareCmsHtml(short) }}
                    />
                  )}
                  {!isPlaceholder(more) && (
                    <ReadMore id={`nx-about-${i}`} title={item.title} content={more} />
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </Layout>
  );
};

export default AboutNew;

export const data = graphql`
  fragment NxAbout on DatoCmsAboutnew {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    welcomeNode {
      childMarkdownRemark {
        html
      }
    }
    aboutarea {
      id
      title
      image {
        alt
        focalPoint {
          x
          y
        }
        fluid(maxWidth: 480) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
    itemAboutus {
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
        fluid(maxWidth: 640) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }

  query {
    about_en: datoCmsAboutnew(locale: { eq: "en" }) {
      ...NxAbout
    }
    about_es: datoCmsAboutnew(locale: { eq: "es" }) {
      ...NxAbout
    }
  }
`;
