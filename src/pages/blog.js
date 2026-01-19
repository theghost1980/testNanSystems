import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { useTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";

const Blog = (props) => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataBlogList = _lang === "es" ? props.data.data_es : props.data.data_en;
  const blogImg =
    _lang === "es"
      ? props.data.datoCmsInfoSite.blogImg_es
      : props.data.datoCmsInfoSite.blogImg_en;
  const dataSEO =
    _lang === "es" ? props.data.dataSEO_es : props.data.dataSEO_en;

  return (
    <Layout>
      <HelmetDatoCms seo={dataSEO.seoMetaTags} />
      <div className="blogCont">
        <div className="blogListBlog">
          <ul className="ulBlogListBlog">
            {dataBlogList.edges.map(({ node: post }) => {
              return (
                <div key={post.id} className="itemVenture fullw">
                  <div className="contentAllMargins">
                    <div className="ventureItemCont">
                      <div className="bgLogoBigBottom"></div>
                      <div className="contentVentureItem">
                        <Link to={`/blog/${post.slug}`}>
                          <h1 className="titleItemVenture">{post.title}</h1>
                          <h3 className="titleItemVenture">
                            <p>
                              {post.datePublished} - (
                              {post.contentNode.childMarkdownRemark.timeToRead}{" "}
                              {t("blogList.readingtime")}
                            </p>
                          </h3>
                          <h6 className="miniDateBlog">{post.categories}</h6>
                        </Link>
                      </div>
                      <Img
                        fluid={post.coverImage.fluid}
                        className="itemVentureImg"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const data = graphql`
  query {
    datoCmsInfoSite {
      blogImg_en: blogImage {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      blogImg_es: blogImageEs {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    data_en: allDatoCmsBlogPost(
      filter: { locale: { eq: "en" } }
      sort: { fields: datePublished, order: DESC }
    ) {
      edges {
        node {
          id
          locale
          slug
          title
          datePublished(fromNow: true)
          contentNode {
            childMarkdownRemark {
              timeToRead
            }
          }
          coverImage {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
          categories
        }
      }
    }
    data_es: allDatoCmsBlogPost(
      filter: { locale: { eq: "es" } }
      sort: { fields: datePublished, order: DESC }
    ) {
      edges {
        node {
          id
          locale
          slug
          title
          datePublished(fromNow: true)
          contentNode {
            childMarkdownRemark {
              timeToRead
            }
          }
          coverImage {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
          categories
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
