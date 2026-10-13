import React from "react";
import { graphql, Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import Pills from "../components/pills";
import PostMeta from "../components/postMeta";
import { useNx } from "../hooks/useNx";
import { parseCategories, readMinutes } from "../utils/content";

// Anchos reales del slot (contenedor de 1320 px, dos columnas desde 640 px; la destacada
// ocupa 7/12 desde 768 px).
const SIZES = "(min-width: 1320px) 608px, (min-width: 640px) 48vw, 100vw";
const SIZES_FEATURED = "(min-width: 1320px) 720px, (min-width: 768px) 56vw, 100vw";

const PostCard = ({ node, featured }) => {
  const cats = parseCategories(node.categories);
  return (
    <Link
      className={`nx-card nx-card--link nx-post-card${featured ? " nx-post-card--featured" : ""}`}
      to={`/blog/${node.slug}`}
    >
      <Media
        image={node.coverImage}
        fallbackAlt={node.title}
        ratio="16x10"
        sizes={featured ? SIZES_FEATURED : SIZES}
        className="nx-media--lg nx-media--blur"
      />
      <div className="nx-post-card__body">
        <Pills items={cats} />
        <h2 className="nx-post-card__title">{node.title}</h2>
        <PostMeta date={node.datePublished} minutes={readMinutes(node)} />
      </div>
    </Link>
  );
};

const Blog = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const seo = data[`dataSEO_${L}`];
  const posts = data[`posts_${L}`].edges;
  // El epígrafe es opcional: con la clave vacía no se pinta el recuadro.
  const quote = t("blog.quote");

  return (
    <Layout>
      {seo && <HelmetDatoCms seo={seo.seoMetaTags} />}
      <section className="nx-page-head nx-container" aria-labelledby="nx-blog-title">
        <h1 className="nx-h1" id="nx-blog-title">
          {t("menu.blog")}
        </h1>
        <p className="nx-lead">{t("blog.intro")}</p>
        {quote && <blockquote className="nx-epigraph">{quote}</blockquote>}
      </section>
      <section className="nx-section nx-section--tight nx-container" aria-label={t("menu.blog")}>
        {posts.length ? (
          <div className="nx-grid nx-grid--2">
            {posts.map(({ node }, i) => (
              <PostCard key={node.id} node={node} featured={i === 0} />
            ))}
          </div>
        ) : (
          <p className="nx-empty">{t("blog.empty")}</p>
        )}
      </section>
    </Layout>
  );
};

export default Blog;

export const data = graphql`
  fragment NxBlogCard on DatoCmsBlogPost {
    id
    slug
    title
    datePublished
    categories
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
      fluid(maxWidth: 770) {
        ...GatsbyDatoCmsFluid
      }
    }
  }

  query {
    posts_en: allDatoCmsBlogPost(
      filter: { locale: { eq: "en" } }
      sort: { fields: datePublished, order: DESC }
    ) {
      edges {
        node {
          ...NxBlogCard
        }
      }
    }
    posts_es: allDatoCmsBlogPost(
      filter: { locale: { eq: "es" } }
      sort: { fields: datePublished, order: DESC }
    ) {
      edges {
        node {
          ...NxBlogCard
        }
      }
    }
    dataSEO_en: datoCmsSeoBlog(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsSeoBlog(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
