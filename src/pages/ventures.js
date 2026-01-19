import React from "react";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Button from "../components/button";
import { useTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";

const Ventures = (props) => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataSEO =
    _lang === "es" ? props.data.dataSEO_es : props.data.dataSEO_en;
  const dataVenture =
    _lang === "es" ? props.data.dataVenture_es : props.data.dataVenture_en;

  return (
    <Layout>
      <HelmetDatoCms seo={dataSEO.seoMetaTags} />
      <div className="venturesCont">
        {dataVenture.itemVenture.map((venture) => {
          return (
            <div
              key={venture.id}
              data-sal="slide-right"
              data-sal-delay="300"
              data-sal-easing="ease"
              className="itemVenture"
            >
              <div className="contentAllMargins">
                <div className="ventureItemCont">
                  <div className="contentVentureItem">
                    <h1 className="titleItemVenture">{venture.title}</h1>
                    <div
                      className="descItemVenture"
                      dangerouslySetInnerHTML={{
                        __html:
                          venture.shortDescriptionNode.childMarkdownRemark.html,
                      }}
                    />
                    <Button
                      value={t("button.readmore")}
                      type="btnNoFilled"
                      pathname="/singleventure"
                      action="move"
                      data={{
                        title: venture.title,
                        id: venture.id,
                        mainImage: venture.imageVenture.fluid,
                        shortDesc:
                          venture.shortDescriptionNode.childMarkdownRemark.html,
                        content: venture.contentNode.childMarkdownRemark.html,
                        seoData: dataSEO.seoMetaTags,
                      }}
                    />
                  </div>
                  <Img
                    fluid={venture.imageVenture.fluid}
                    className="itemVentureImg"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Ventures;

export const data = graphql`
  query {
    dataSEO_en: datoCmsSeoVenture(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsSeoVenture(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataVenture_en: datoCmsVenture(locale: { eq: "en" }) {
      welcomeNode {
        childMarkdownRemark {
          html
        }
      }
      itemVenture {
        id
        shortDescriptionNode {
          childMarkdownRemark {
            html
          }
        }
        title
        imageVenture {
          fluid {
            ...GatsbyDatoCmsFluid
          }
        }
        contentNode {
          childMarkdownRemark {
            html
          }
        }
      }
      sidePicture {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
    }
    dataVenture_es: datoCmsVenture(locale: { eq: "es" }) {
      welcomeNode {
        childMarkdownRemark {
          html
        }
      }
      itemVenture {
        id
        shortDescriptionNode {
          childMarkdownRemark {
            html
          }
        }
        title
        imageVenture {
          fluid {
            ...GatsbyDatoCmsFluid
          }
        }
        contentNode {
          childMarkdownRemark {
            html
          }
        }
      }
      sidePicture {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
