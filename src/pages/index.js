import React, { useState } from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import Img from "gatsby-image";
import Testimonyfixed from "../components/testimonyFixed";
import "../styles/styles.css";
import autoLogo from "../media-imgs/autocad.png";
import redLogo from "../media-imgs/red-hat-linux.png";
import niagaLogo from "../media-imgs/niagara-framework.svg";
import tridiumLogo from "../media-imgs/tridium.svg";
import { useTranslation } from "react-i18next";
import { graphql, Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import NetlifyForm from "../components/mailChimpForm";
import NewCarouselHome from "../components/newCarouselHome";

const Index = (props) => {
  const [showSubcription, setShowSubcription] = useState(false);
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataBlogList = _lang === "es" ? props.data.data_es : props.data.data_en;
  const dataSEO =
    _lang === "es" ? props.data.dataSEO_es : props.data.dataSEO_en;
  const dataVenture =
    _lang === "es" ? props.data.dataVenture_es : props.data.dataVenture_en;

  return (
    <Layout>
      <HelmetDatoCms seo={dataSEO.seoMetaTags} />
      <div className="homeContainer">
        <div className="carouselContainer">
          <NewCarouselHome />
        </div>
        <div className="rowSection">
          <div className="justMinH200p">
            <p className="titleHome colorContrastText2">{t("home.latest")}</p>
            <ul className="blogULHome">
              {dataBlogList.edges.map((item) => {
                return (
                  <Link
                    to={`blog/${item.node.slug}`}
                    state={{ fromPage: "home" }}
                    key={item.node.id}
                  >
                    <li>
                      <div className="itemBlogList justWhiteBack">
                        <p className="subtitleHome">{item.node.title}</p>
                        <p className="spanReadingTime">
                          (
                          {item.node.contentNode.childMarkdownRemark.timeToRead}{" "}
                          {t("blogList.readingtime")}
                        </p>
                        <div className="imgContNew">
                          <Img
                            fluid={item.node.coverImage.fluid}
                            className="imgPostIndex"
                          />
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="justMinH200p">
            <p className="titleHome centerAlign colorContrastText2">
              {t("home.some")}
            </p>
            <ul className="ulTechListHome">
              <li>
                <img
                  src={autoLogo}
                  alt="AutoCAD professional Ana Echeverria"
                  className="logoHome"
                />
              </li>
              <li>
                <img
                  src={redLogo}
                  alt="RedHat professional Ana Echeverria"
                  className="logoHome"
                />
              </li>
              <li>
                <img
                  src={tridiumLogo}
                  alt="Tridium professional Ana Echeverria"
                  className="logoHome"
                />
              </li>
              <li>
                <img
                  src={niagaLogo}
                  alt="Niagara professional Ana Echeverria"
                  className="logoHome"
                />
              </li>
            </ul>
          </div>
        </div>
        <Testimonyfixed />
        <div className="technologiesContHome">
          {dataVenture.edges.map(({ node: tech }) => {
            return (
              <div key={tech.id} className="itemVenture">
                <div className="contentAllMargins">
                  <div className="ventureItemCont">
                    <div className="contentVentureItem">
                      <h1 className="titleItemVenture">{tech.title}</h1>
                      <div
                        className="descItemVenture"
                        dangerouslySetInnerHTML={{
                          __html:
                            tech.shortDescriptionNode.childMarkdownRemark.html,
                        }}
                      />
                      <Button
                        value={t("button.readmore")}
                        type="btnNoFilled"
                        action="Link"
                        pathname={`/${tech.slug}`}
                        data={{
                          title: tech.title,
                          id: tech.id,
                          mainImage: tech.coverImage.fluid,
                          shortDesc:
                            tech.shortDescriptionNode.childMarkdownRemark.html,
                          content: tech.contentNode.childMarkdownRemark.html,
                          seoData: dataSEO.seoMetaTags,
                        }}
                      />
                    </div>
                    <Img
                      fluid={tech.coverImage.fluid}
                      className="itemVentureImg"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <section className="divSubcriptionNewsLetter">
          <div
            className="btnSubscribe xtraStyles"
            onClick={() => setShowSubcription(!showSubcription)}
          >
            {t("subscribe.getgood")}
          </div>

          {showSubcription && (
            <>
              <NetlifyForm closeCB={() => setShowSubcription(false)} />
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Index;

export const data = graphql`
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
    data_en: allDatoCmsBlogPost(
      filter: { locale: { eq: "en" } }
      sort: { fields: datePublished, order: ASC }
      limit: 2
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
        }
      }
    }
    data_es: allDatoCmsBlogPost(
      filter: { locale: { eq: "es" } }
      sort: { fields: datePublished, order: ASC }
      limit: 2
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
        }
      }
    }
    dataVenture_en: allDatoCmsTechnology(filter: { locale: { eq: "en" } }) {
      edges {
        node {
          coverImage {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
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
          id
        }
      }
    }
    dataVenture_es: allDatoCmsTechnology(filter: { locale: { eq: "es" } }) {
      edges {
        node {
          coverImage {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
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
          id
        }
      }
    }
  }
`;
