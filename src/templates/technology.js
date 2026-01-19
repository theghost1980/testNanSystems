import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image";
import Sharebuttons from "../components/shareButton";
import Button from "../components/button";
import { useTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";

const Technology = (props) => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataTech = _lang === "es" ? props.data.tech_es : props.data.tech_en;
  const _twitterHandle = "_MsLinda";
  const _url = props.location.href;
  const _titlePost = dataTech.title;
  const _tags = dataTech.categories;

  return (
    <Layout>
      <HelmetDatoCms seo={dataTech.seoMetaTags} />
      <div className="singleVentureCont">
        <div className="rowTop">
          <div className="width50">
            <h1 className="titleItemVenture">{dataTech.title}</h1>
            <div
              className="descItemVenture"
              dangerouslySetInnerHTML={{
                __html: dataTech.shortDescriptionNode.childMarkdownRemark.html,
              }}
            />
            <Button
              value={t("button.getquote")}
              type="btnFilled"
              pathname="/"
            />
            <Sharebuttons
              url={_url}
              title={_titlePost}
              twitterHandle={_twitterHandle}
              tags={_tags}
              sizeAll={"35"}
              align="alignLeftSB"
            />
          </div>
          <div className="width50">
            <Img fluid={dataTech.coverImage.fluid} className="shadow" />
          </div>
        </div>
        <div
          className="ventureContent"
          dangerouslySetInnerHTML={{
            __html: dataTech.contentNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </Layout>
  );
};

export default Technology;

export const data = graphql`
  query TechQuery($slug: String!) {
    tech_en: datoCmsTechnology(slug: { eq: $slug }, locale: { eq: "en" }) {
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      shortDescriptionNode {
        childMarkdownRemark {
          html
        }
      }
      slug
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      coverImage {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      categories
    }
    tech_es: datoCmsTechnology(slug: { eq: $slug }, locale: { eq: "es" }) {
      contentNode {
        childMarkdownRemark {
          html
        }
      }
      shortDescriptionNode {
        childMarkdownRemark {
          html
        }
      }
      slug
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      coverImage {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
      categories
    }
  }
`;
