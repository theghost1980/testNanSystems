import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import Pills from "../components/pills";
import Share from "../components/share";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { parseCategories, prepareCmsHtml } from "../utils/content";

// Va dentro de <Layout>: el proveedor de diálogos vive ahí.
const QuoteButton = ({ title }) => {
  const { t } = useNx();
  const { open } = useDialog();
  return (
    <button className="nx-btn nx-btn--coral" type="button" onClick={() => open("nx-quote", title)}>
      {t("technology.quote")}
    </button>
  );
};

const Technology = ({ data, location }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  // Si el servicio no existe en el idioma elegido se muestra el otro, nunca una página rota.
  const tech = data[`tech_${L}`] || data.tech_es || data.tech_en;
  const cats = parseCategories(tech.categories);
  const short = tech.shortDescriptionNode && tech.shortDescriptionNode.childMarkdownRemark;
  const content = tech.contentNode && tech.contentNode.childMarkdownRemark;

  return (
    <Layout>
      <HelmetDatoCms seo={tech.seoMetaTags} />
      <article className="nx-article nx-section nx-section--tight nx-container">
        <header className="nx-article__head">
          <span className="nx-mono">
            {t("technology.service")}
            {tech.shortTitle ? ` · ${tech.shortTitle}` : ""}
          </span>
          <h1 className="nx-h1">{tech.title}</h1>
          {short && (
            <div
              className="nx-prose nx-prose--lg"
              dangerouslySetInnerHTML={{ __html: prepareCmsHtml(short.html) }}
            />
          )}
          <Pills items={cats} />
          <div className="nx-form__actions">
            <QuoteButton title={tech.title} />
          </div>
        </header>
        <Media
          image={tech.coverImage}
          fallbackAlt={tech.title}
          ratio="3x2"
          sizes="(min-width: 1320px) 1256px, 100vw"
          priority
          className="nx-media--card nx-media--blur"
        />
        {content && (
          <div
            className="nx-prose nx-prose--lg"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(content.html) }}
          />
        )}
        <footer className="nx-article__footer">
          <Share
            path={location.pathname}
            title={tech.title}
            categories={tech.categories}
            labelKey="about.share"
          />
        </footer>
      </article>
    </Layout>
  );
};

export default Technology;

export const data = graphql`
  fragment NxTechFull on DatoCmsTechnology {
    slug
    title
    shortTitle
    categories
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
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
    coverImage {
      alt
      focalPoint {
        x
        y
      }
      fluid(maxWidth: 1256) {
        ...GatsbyDatoCmsFluid
      }
    }
  }

  query TechQuery($slug: String!) {
    tech_en: datoCmsTechnology(slug: { eq: $slug }, locale: { eq: "en" }) {
      ...NxTechFull
    }
    tech_es: datoCmsTechnology(slug: { eq: $slug }, locale: { eq: "es" }) {
      ...NxTechFull
    }
  }
`;
