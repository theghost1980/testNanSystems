import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import Sharebuttons from "../components/shareButton";
import { useTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";

const Blogpost = (props) => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataPost = _lang === "es" ? props.data.post_es : props.data.post_en;
  const _twitterHandle = "_MsLinda";
  const _url = props.location.href;
  const _titlePost = dataPost.title;
  const _tags = dataPost.categories;

  return (
    <Layout>
      <HelmetDatoCms seo={dataPost.seoMetaTags} />
      <div className="postCont">
        <div className="imgPostCont">
          <Img fluid={dataPost.coverImage.fluid} className="coverImgPost" />
        </div>
        <Sharebuttons
          url={_url}
          title={_titlePost}
          twitterHandle={_twitterHandle}
          tags={_tags}
          sizeAll={"35"}
        />
        <div className="textPostCont">
          <h2 className="centeredTitle titlePost">{dataPost.title}</h2>
          <p className="datePostText centeredTitle">{dataPost.datePublished}</p>
          <hr className="hrsinglePost" />
          <div
            className="textParaPost"
            dangerouslySetInnerHTML={{
              __html: dataPost.contentNode.childMarkdownRemark.html,
            }}
          />
          <div className="postCatCont">
            <p className="textParaPost smalltext">
              {t("blogpost.categories")} {dataPost.categories}.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blogpost;

export const data = graphql`
  query PostQuery($slug: String!) {
    post_en: datoCmsBlogPost(slug: { eq: $slug }, locale: { eq: "en" }) {
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      slug
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      datePublished(formatString: "YYYY:MM:DD")
      coverImage {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      categories
    }
    post_es: datoCmsBlogPost(slug: { eq: $slug }, locale: { eq: "es" }) {
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      slug
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      datePublished(formatString: "YYYY:MM:DD")
      coverImage {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      categories
    }
  }
`;
