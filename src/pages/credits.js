import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import Media from "../components/media";
import Icon from "../components/icons";
import { useNx } from "../hooks/useNx";

// Los créditos del CMS son logos sin leyenda: el nombre sale del dominio del enlace.
const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
};

const Credits = ({ data }) => {
  const { t } = useNx();
  const credits = data.credits.edges;

  return (
    <Layout showCta={false}>
      <Helmet title={t("meta.credits")} />
      <section className="nx-page-head nx-container" aria-labelledby="nx-cr-title">
        <h1 className="nx-h1" id="nx-cr-title">
          {t("footer.credits")}
        </h1>
        <p className="nx-lead">{t("credits.intro")}</p>
      </section>
      <section className="nx-section nx-section--tight nx-container" aria-label={t("footer.credits")}>
        <ul className="nx-credits">
          {credits.map(({ node }) => {
            const name = node.legend || hostOf(node.url);
            return (
              <li key={node.id} className="nx-card nx-credit">
                <Media
                  image={node.image}
                  alt=""
                  fit="contain"
                  ratio="1x1"
                  sizes="250px"
                  className="nx-media--lg nx-media--contain"
                />
                <p className="nx-h4">{name}</p>
                <a
                  className="nx-link"
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("button.viewResource")}: ${name} ${t("a11y.externalLink")}`}
                >
                  <span>{t("button.viewResource")}</span> <Icon name="external" size={16} />
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export default Credits;

export const data = graphql`
  query {
    credits: allDatoCmsCredit(filter: { locale: { eq: "en" } }) {
      edges {
        node {
          id
          url
          legend
          image {
            fluid(maxWidth: 250, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`;
