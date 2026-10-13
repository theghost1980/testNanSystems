import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import ReadMore from "../components/readMore";
import Share from "../components/share";
import { useNx } from "../hooks/useNx";
import { HIDDEN_CERTIFICATIONS } from "../config/site";
import { isPlaceholder, prepareCmsHtml } from "../utils/content";

// Anchos reales del hueco (contenedor de 1320 px; tres tarjetas desde 960 px; el ítem usa
// dos columnas desde 768 px).
const SIZES_CARD = "(min-width: 1320px) 408px, (min-width: 960px) 30vw, 100vw";
const SIZES_FEATURE = "(min-width: 1320px) 608px, (min-width: 768px) 48vw, 100vw";
const SIZES_BIO = "(min-width: 1320px) 520px, (min-width: 960px) 40vw, 100vw";

const html = (node) => (node && node.childMarkdownRemark && node.childMarkdownRemark.html) || "";

const AboutNew = ({ data, location }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const page = data[`about_${L}`];
  const bio = data[`bio_${L}`];
  const certs = data[`certs_${L}`].edges
    .map(({ node }) => node)
    .filter((c) => !HIDDEN_CERTIFICATIONS.test(c.title));
  const welcome = html(page.welcomeNode);
  const bioText = bio ? html(bio.engineerNode) : "";
  // `aboutnew` no tiene campo SEO propio (la pestaña diría solo "NaNSYSTEMS.us"): se usa el de `about`.
  const seo = (bio && bio.seoMetaTags) || page.seoMetaTags;

  return (
    <Layout>
      <HelmetDatoCms seo={seo} />
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
            // Si `shotTitle` o `content` trajeran relleno, la etiqueta sería "Área 0N" y no se
            // ofrecería "Leer más" (protección frente a texto de prueba en el CMS).
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

      {bioText && (
        <section
          className="nx-section nx-section--tight nx-container"
          aria-labelledby="nx-bio-title"
        >
          <div className="nx-two-col">
            {bio.profilePic && (
              <Media
                image={bio.profilePic}
                fallbackAlt="Ana Echeverría"
                ratio="4x5"
                sizes={SIZES_BIO}
                className="nx-media--card nx-media--blur"
              />
            )}
            <div className="nx-stack">
              <span className="nx-mono">{t("about.headline")}</span>
              <h2 className="nx-h2" id="nx-bio-title">
                Ana Echeverría
              </h2>
              <div
                className="nx-prose nx-prose--lg"
                dangerouslySetInnerHTML={{ __html: prepareCmsHtml(bioText) }}
              />
            </div>
          </div>
        </section>
      )}

      {certs.length > 0 && (
        <section
          className="nx-section nx-section--tight nx-container"
          aria-labelledby="nx-certs-title"
        >
          <h2 className="nx-h2 nx-mb" id="nx-certs-title">
            {t("about.certifications")}
          </h2>
          <ul className="nx-grid nx-grid--3">
            {certs.map((c) => {
              const desc = html(c.descriptionNode);
              return (
                <li key={c.id} className="nx-card nx-card--pad nx-stack nx-stack--sm">
                  {c.areaExpertise && <span className="nx-mono">{c.areaExpertise}</span>}
                  <h3 className="nx-h4">{c.title}</h3>
                  {desc && (
                    <div
                      className="nx-prose nx-prose--sm"
                      dangerouslySetInnerHTML={{ __html: prepareCmsHtml(desc) }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
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

  fragment NxAboutBio on DatoCmsAbout {
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    engineerNode {
      childMarkdownRemark {
        html
      }
    }
    profilePic {
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

  fragment NxCertification on DatoCmsCertification {
    id
    title
    areaExpertise
    descriptionNode {
      childMarkdownRemark {
        html
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
    bio_en: datoCmsAbout(locale: { eq: "en" }) {
      ...NxAboutBio
    }
    bio_es: datoCmsAbout(locale: { eq: "es" }) {
      ...NxAboutBio
    }
    certs_en: allDatoCmsCertification(
      filter: { locale: { eq: "en" } }
      sort: { fields: issuedDate, order: DESC }
    ) {
      edges {
        node {
          ...NxCertification
        }
      }
    }
    certs_es: allDatoCmsCertification(
      filter: { locale: { eq: "es" } }
      sort: { fields: issuedDate, order: DESC }
    ) {
      edges {
        node {
          ...NxCertification
        }
      }
    }
  }
`;
