import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import expLightIcon from "../media-imgs/expand-light.png";
import collapseLightIcon from "../media-imgs/collapse-light.png";
import actualJobIcon from "../media-imgs/actualJob.png";
import { useTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";

const Portfolio = (props) => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const dataWorkList = _lang === "es" ? props.data.work_es : props.data.work_en;
  const dataSEO =
    _lang === "es" ? props.data.dataSEO_es : props.data.dataSEO_en;
  const initialState = dataWorkList.edges.map(({ node: item }) => {
    return { id: item.id, value: false };
  });
  let [states, setStates] = useState(initialState);

  const HandleState = (idItem) => {
    setStates((prevState) =>
      prevState.map((item) =>
        String(item.id).substr(0, String(item.id).length - 3) ===
        String(idItem).substr(0, String(idItem).length - 3)
          ? { id: item.id, value: !item.value }
          : item,
      ),
    );
  };

  return (
    <Layout>
      <HelmetDatoCms seo={dataSEO.seoMetaTags} />
      <div className="portfolioCont">
        <p className="pargraphPortfolio">{t("portfolio.text")}</p>
        <ul className="portfUL">
          {dataWorkList.edges.map(({ node: work }) => {
            const expanded = states.find(
              (element) =>
                String(element.id).substr(0, String(element.id).length - 3) ===
                String(work.id).substr(0, String(work.id).length - 3),
            );
            return (
              <li key={work.id}>
                <div
                  className={`workCont ${
                    expanded.value ? "expanded" : "noExpanded"
                  }`}
                >
                  <div className="workContRow">
                    <p className="titlePortfolio">{work.jobTitle}</p>
                    <div
                      className="iconImgCont"
                      onClick={() => HandleState(work.id)}
                    >
                      <img
                        src={expanded.value ? collapseLightIcon : expLightIcon}
                        alt="expand view"
                        className="iconExpand"
                      />
                    </div>
                    {!work.dateOut ||
                    work.dateOut === " " ||
                    work.dateOut === null ||
                    work.dateOut === "N/A" ? (
                      <div className="actualJobIconCont">
                        <img
                          src={actualJobIcon}
                          alt="actual Job"
                          className="actualJobIcon"
                        />
                      </div>
                    ) : null}
                  </div>
                  <ul>
                    <li className="subtitlePortfolio">{work.company}</li>
                    {work.accomplishmentsNode.childMarkdownRemark.html !== "" &&
                      work.accomplishmentsNode.childMarkdownRemark.html !==
                        null && (
                        <li>
                          <div
                            className="textPortfolio"
                            dangerouslySetInnerHTML={{
                              __html:
                                work.accomplishmentsNode.childMarkdownRemark
                                  .html,
                            }}
                          />
                        </li>
                      )}
                    <li className="subtitlePortfolio">
                      {t("portfolio.since")} {work.dateIn}{" "}
                      {work.dateOut
                        ? `${t("portfolio.until")} ${work.dateOut}`
                        : `${t("portfolio.actual")}`}
                    </li>
                    <li className="subtitlePortfolio">{work.company}</li>
                    {work.urlCompany !== null &&
                      work.urlCompany !== "" &&
                      work.urlCompany !== "N/A" && (
                        <li className="subtitlePortfolio">
                          <a
                            href={work.urlCompany}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("portfolio.visit")}
                          </a>
                        </li>
                      )}
                    <li className="subtitlePortfolio">{work.place}</li>
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Portfolio;

export const data = graphql`
  query {
    work_en: allDatoCmsWorkExperience(
      filter: { locale: { eq: "en" } }
      sort: { order: DESC, fields: dateIn }
    ) {
      edges {
        node {
          accomplishmentsNode {
            childMarkdownRemark {
              html
            }
          }
          company
          dateIn(formatString: "YYYY")
          dateOut(formatString: "YYYY")
          id
          jobDescriptionNode {
            childMarkdownRemark {
              html
            }
          }
          jobTitle
          locale
          opinionAboutCompanyNode {
            childMarkdownRemark {
              html
            }
          }
          place
          responsibilitiesNode {
            childMarkdownRemark {
              html
            }
          }
          salary
          urlCompany
        }
      }
    }
    work_es: allDatoCmsWorkExperience(
      filter: { locale: { eq: "es" } }
      sort: { order: DESC, fields: dateIn }
    ) {
      edges {
        node {
          accomplishmentsNode {
            childMarkdownRemark {
              html
            }
          }
          company
          dateIn(formatString: "YYYY")
          dateOut(formatString: "YYYY")
          id
          jobDescriptionNode {
            childMarkdownRemark {
              html
            }
          }
          jobTitle
          locale
          opinionAboutCompanyNode {
            childMarkdownRemark {
              html
            }
          }
          place
          responsibilitiesNode {
            childMarkdownRemark {
              html
            }
          }
          salary
          urlCompany
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
