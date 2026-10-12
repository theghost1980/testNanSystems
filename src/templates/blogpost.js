import React from "react";
import { graphql, Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Media from "../components/media";
import Icon from "../components/icons";
import Pills from "../components/pills";
import PostMeta from "../components/postMeta";
import Share from "../components/share";
import { useNx } from "../hooks/useNx";
import { parseCategories, prepareCmsHtml, readMinutes } from "../utils/content";

const Blogpost = ({ data, location }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  // Si el artículo no existe en el idioma elegido se muestra el otro, nunca una página rota.
  const post = data[`post_${L}`] || data.post_es || data.post_en;
  const cats = parseCategories(post.categories);
  const md = post.contentNode && post.contentNode.childMarkdownRemark;
  const hasCover = Boolean(post.coverImage && post.coverImage.fluid);

  return (
    <Layout>
      <HelmetDatoCms seo={post.seoMetaTags} />
      <article className="nx-article nx-section nx-section--tight nx-container">
        <Link className="nx-link-more" to="/blog">
          <Icon name="back" size={18} /> <span>{t("blog.back")}</span>
        </Link>
        {/* Con portada, desde 768 px la cabecera va sobre la imagen; sin portada no se pinta el hueco. */}
        <div className={`nx-post-hero${hasCover ? " nx-post-hero--over" : ""}`}>
          <header className="nx-post-hero__head">
            <Pills items={cats} />
            <h1 className="nx-h1">{post.title}</h1>
            <p className="nx-article__meta">
              <PostMeta date={post.datePublished} minutes={readMinutes(post)} />
            </p>
          </header>
          {hasCover && (
            <Media
              image={post.coverImage}
              fallbackAlt={post.title}
              ratio="2x1"
              sizes="(min-width: 1320px) 1256px, 100vw"
              priority
              className="nx-media--card nx-media--blur"
            />
          )}
        </div>
        {md && (
          <div
            className="nx-prose nx-prose--lg"
            dangerouslySetInnerHTML={{ __html: prepareCmsHtml(md.html) }}
          />
        )}
        <footer className="nx-article__footer">
          {cats.length > 0 && (
            <>
              <p>
                <span className="nx-mono">{t("blogpost.categories")}</span>
              </p>
              <Pills items={cats} />
            </>
          )}
          <Share path={location.pathname} title={post.title} categories={post.categories} />
        </footer>
      </article>
    </Layout>
  );
};

export default Blogpost;

export const data = graphql`
  fragment NxPostFull on DatoCmsBlogPost {
    slug
    title
    datePublished
    categories
    seoMetaTags {
      ...GatsbyDatoCmsSeoMetaTags
    }
    contentNode {
      childMarkdownRemark {
        html
        timeToRead
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

  query PostQuery($slug: String!) {
    post_en: datoCmsBlogPost(slug: { eq: $slug }, locale: { eq: "en" }) {
      ...NxPostFull
    }
    post_es: datoCmsBlogPost(slug: { eq: $slug }, locale: { eq: "es" }) {
      ...NxPostFull
    }
  }
`;
