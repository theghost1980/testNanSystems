import React, { useState } from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Icon from "../components/icons";
import { useNx } from "../hooks/useNx";
import { techYears } from "../config/site";
import { prepareCmsHtml, usefulBlocks } from "../utils/content";

// Los cuatro bloques de texto de cada puesto, en el orden del diseño. `salary` y
// `opinionAboutCompany` no se piden ni se muestran nunca.
const BLOCKS = [
  ["description", "jobDescriptionNode"],
  ["responsibilities", "responsibilitiesNode"],
  ["tasks", "summaryTasksNode"],
  ["accomplishments", "accomplishmentsNode"],
];

const html = (node) => (node && node.childMarkdownRemark && node.childMarkdownRemark.html) || "";

const Experience = ({ work, first }) => {
  const { t } = useNx();
  const current = !work.dateOut;
  // El CMS trae relleno ("Lorem Ipsum") y textos repetidos: solo se muestra lo que aporta.
  const blocks = usefulBlocks(
    BLOCKS.map(([key, field]) => ({ key, html: html(work[field]) })),
    work.jobTitle
  );
  const url = /^https?:\/\//i.test(work.urlCompany || "") ? work.urlCompany : null;
  // Solo hay desplegable si hay texto que mostrar; si solo hay enlace, va en la línea de datos.
  const expandable = blocks.length > 0;
  const [open, setOpen] = useState(expandable && current && first);
  const panelId = `nx-exp-${work.id}`;
  const range =
    current || work.dateOut !== work.dateIn
      ? `${work.dateIn} — ${current ? t("portfolio.actual") : work.dateOut}`
      : work.dateIn;

  const link = url && (
    <a className="nx-link" href={url} target="_blank" rel="noopener noreferrer">
      <span>{t("portfolio.visit")}</span> <Icon name="external" size={16} />
      <span className="nx-sr-only"> {t("a11y.externalLink")}</span>
    </a>
  );

  return (
    <>
      <div className="nx-row nx-row--stack nx-row--exp">
        <span className="nx-exp__range">{range}</span>
        <h2 className="nx-row__title">{work.jobTitle}</h2>
        <p className="nx-row__meta">
          <span>
            {work.company}
            {work.place && (
              <>
                {" "}
                <span aria-hidden="true">·</span> {work.place}
              </>
            )}
          </span>
          {current && (
            <span className="nx-pill nx-pill--coral nx-pill--dot">{t("portfolio.actual")}</span>
          )}
          {!expandable && link}
        </p>
        {expandable && (
          <button
            className="nx-row__action nx-icon-btn nx-icon-btn--coral nx-acc__toggle"
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${t("button.details")}: ${work.jobTitle}`}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name="plus" className="nx-ico-plus" />
            <Icon name="minus" className="nx-ico-minus" />
          </button>
        )}
      </div>
      {expandable && (
        <div className="nx-acc__panel" id={panelId} hidden={!open}>
          <div className="nx-exp__grid">
            {blocks.map((b) => (
              <div key={b.key}>
                <h3 className="nx-mono">{t(`portfolio.${b.key}`)}</h3>
                <div
                  className="nx-prose nx-prose--sm"
                  dangerouslySetInnerHTML={{ __html: prepareCmsHtml(b.html) }}
                />
              </div>
            ))}
          </div>
          {link && <p>{link}</p>}
        </div>
      )}
    </>
  );
};

const Portfolio = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const seo = data[`dataSEO_${L}`];
  const works = data[`work_${L}`].edges;

  return (
    <Layout>
      {seo && <HelmetDatoCms seo={seo.seoMetaTags} />}
      <section className="nx-page-head nx-container" aria-labelledby="nx-pf-title">
        <h1 className="nx-h1" id="nx-pf-title">
          {t("menu.portfolio")}
        </h1>
        <p className="nx-lead">{t("portfolio.text", { years: techYears() })}</p>
      </section>
      <section className="nx-section nx-section--tight nx-container" aria-label={t("menu.portfolio")}>
        {works.length ? (
          <div className="nx-list">
            {works.map(({ node }, i) => (
              <Experience key={node.id} work={node} first={i === 0} />
            ))}
          </div>
        ) : (
          <p className="nx-empty">{t("portfolio.empty")}</p>
        )}
      </section>
    </Layout>
  );
};

export default Portfolio;

export const data = graphql`
  fragment NxWork on DatoCmsWorkExperience {
    id
    jobTitle
    company
    place
    dateIn(formatString: "YYYY")
    dateOut(formatString: "YYYY")
    urlCompany
    jobDescriptionNode {
      childMarkdownRemark {
        html
      }
    }
    responsibilitiesNode {
      childMarkdownRemark {
        html
      }
    }
    summaryTasksNode {
      childMarkdownRemark {
        html
      }
    }
    accomplishmentsNode {
      childMarkdownRemark {
        html
      }
    }
  }

  query {
    work_en: allDatoCmsWorkExperience(
      filter: { locale: { eq: "en" } }
      sort: { order: DESC, fields: dateIn }
    ) {
      edges {
        node {
          ...NxWork
        }
      }
    }
    work_es: allDatoCmsWorkExperience(
      filter: { locale: { eq: "es" } }
      sort: { order: DESC, fields: dateIn }
    ) {
      edges {
        node {
          ...NxWork
        }
      }
    }
    dataSEO_en: datoCmsSeoPortfolio(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsSeoPortfolio(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
