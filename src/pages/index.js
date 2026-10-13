import React from "react";
import { Link, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Marquee from "../components/marquee";
import Testimonials from "../components/testimonials";
import Media from "../components/media";
import Icon from "../components/icons";
import { useNx } from "../hooks/useNx";
import PostMeta from "../components/postMeta";
import { readMinutes } from "../utils/content";
import { techYears } from "../config/site";

const Home = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";

  const seo = data[`dataSEO_${L}`];
  const services = data[`services_${L}`].edges;
  const posts = data[`posts_${L}`].edges;
  const testimonies = data[`testimonies_${L}`].edges;
  const years = techYears();

  return (
    <Layout>
      <HelmetDatoCms seo={seo.seoMetaTags} />
      <Hero yearsExperience={years} />
      <Marquee />

      <section className="nx-section nx-container" aria-labelledby="nx-services-title">
        <div className="nx-section__head">
          <h2 className="nx-h2" id="nx-services-title">
            {t("services.title")}
          </h2>
          <Link className="nx-link-more" to="/ventures">
            <span>{t("services.all")}</span> <span aria-hidden="true">→</span>
          </Link>
        </div>
        {services.length ? (
          <div className="nx-list">
            {services.map(({ node }, i) => (
              <Link key={node.id} className="nx-row nx-row--link" to={`/${node.slug}`}>
                <span className="nx-row__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="nx-row__title">{node.title}</h3>
                {node.shortDescriptionNode && (
                  <div
                    className="nx-row__desc nx-prose nx-prose--sm"
                    dangerouslySetInnerHTML={{
                      __html: node.shortDescriptionNode.childMarkdownRemark.html,
                    }}
                  />
                )}
                <span className="nx-row__action nx-icon-btn nx-icon-btn--coral" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="nx-muted">{t("services.empty")}</p>
        )}
      </section>

      <Testimonials items={testimonies} />

      {posts.length > 0 && (
        <section className="nx-section nx-container" aria-labelledby="nx-posts-title">
          <div className="nx-section__head">
            <h2 className="nx-h2" id="nx-posts-title">
              {t("home.latest")}
            </h2>
            <Link className="nx-link-more" to="/blog">
              <span>{t("blog.all")}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="nx-posts nx-grid nx-grid--2-lg">
            {posts.map(({ node }) => (
              <Link
                key={node.id}
                className="nx-card nx-card--link nx-post"
                to={`/blog/${node.slug}`}
              >
                <Media
                  image={node.coverImage}
                  fallbackAlt={node.title}
                  ratio="1x1"
                  className="nx-post__thumb nx-media--md nx-media--blur"
                />
                <div className="nx-post__body">
                  <PostMeta date={node.datePublished} minutes={readMinutes(node)} />
                  <h3 className="nx-post__title">{node.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;

export const data = graphql`
  fragment NxPost on DatoCmsBlogPost {
    id
    slug
    title
    datePublished
    contentNode {
      childMarkdownRemark {
        timeToRead
      }
    }
    coverImage {
      alt
      focalPoint {
        x
        y
      }
      fluid(maxWidth: 240) {
        ...GatsbyDatoCmsFluid
      }
    }
  }

  fragment NxService on DatoCmsTechnology {
    id
    slug
    title
    shortDescriptionNode {
      childMarkdownRemark {
        html
      }
    }
  }

  fragment NxTestimony on DatoCmsTestimony {
    id
    name
    title
    urlProfile
    contentNode {
      childMarkdownRemark {
        html
      }
    }
    profilePicture {
      alt
      focalPoint {
        x
        y
      }
      fluid(maxWidth: 120) {
        ...GatsbyDatoCmsFluid
      }
    }
  }

  query {
    dataSEO_en: datoCmsInfoSite(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsInfoSite(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    posts_en: allDatoCmsBlogPost(
      filter: { locale: { eq: "en" } }
      sort: { fields: datePublished, order: DESC }
      limit: 2
    ) {
      edges {
        node {
          ...NxPost
        }
      }
    }
    posts_es: allDatoCmsBlogPost(
      filter: { locale: { eq: "es" } }
      sort: { fields: datePublished, order: DESC }
      limit: 2
    ) {
      edges {
        node {
          ...NxPost
        }
      }
    }
    services_en: allDatoCmsTechnology(filter: { locale: { eq: "en" } }, sort: { fields: originalId, order: ASC }) {
      edges {
        node {
          ...NxService
        }
      }
    }
    services_es: allDatoCmsTechnology(filter: { locale: { eq: "es" } }, sort: { fields: originalId, order: ASC }) {
      edges {
        node {
          ...NxService
        }
      }
    }
    testimonies_en: allDatoCmsTestimony(filter: { locale: { eq: "en" } }, sort: { fields: name, order: ASC }, limit: 3) {
      edges {
        node {
          ...NxTestimony
        }
      }
    }
    testimonies_es: allDatoCmsTestimony(filter: { locale: { eq: "es" } }, sort: { fields: name, order: ASC }, limit: 3) {
      edges {
        node {
          ...NxTestimony
        }
      }
    }
  }
`;
