import React, { useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import heartIcon from "../media-imgs/heart.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;

  const [clickedMap, setClickedMap] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query {
          allDatoCmsSocialProfile(filter: { locale: { eq: "en" } }) {
            edges {
              node {
                id
                profileType
                url
                seoMetaTags {
                  ...GatsbyDatoCmsSeoMetaTags
                }
                darkIcon {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
                lightIcon {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
              }
            }
          }
          datoCmsInfoSite {
            id
            logoSite {
              fluid {
                ...GatsbyDatoCmsFluid
              }
            }
            logoSiteWhite {
              fluid {
                ...GatsbyDatoCmsFluid
              }
            }
          }
          dataServices_en: allDatoCmsTechnology(
            filter: { locale: { eq: "en" } }
          ) {
            edges {
              node {
                id
                shortTitle
                slug
              }
            }
          }
          dataServices_es: allDatoCmsTechnology(
            filter: { locale: { eq: "es" } }
          ) {
            edges {
              node {
                id
                shortTitle
                slug
              }
            }
          }
        }
      `}
      render={(data) => (
        <footer>
          <div className="rowFooter">
            <div className="rowDisplay justW100 justSpace">
              <div className="columnDisplay justW40p justAligItems">
                <div className="displayBlock250p">
                  <Link
                    to="/"
                    activeClassName="activeNavLink"
                    aria-label={t("menu.ariaHome")}
                  >
                    <Img
                      fluid={data.datoCmsInfoSite.logoSiteWhite.fluid}
                      className="logoFooter scaleHovered justBorderWhite justBorderRounded"
                    />
                  </Link>
                </div>
                <ul className="socialULfooter">
                  {data.allDatoCmsSocialProfile.edges.map((item) => {
                    return (
                      <li key={item.node.id} className="scaleHovered">
                        <a href={item.node.url}>
                          <Img
                            fluid={item.node.lightIcon.fluid}
                            className="socialIconSmaller"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className={`columnDisplay justW40p relativeDiv justAligItems`}
              >
                <ul
                  className={`ulFooterSiteMap ${
                    clickedMap ? "expandedMap shadowWhite" : "collapsedMap"
                  }`}
                  onMouseLeave={() => setClickedMap(false)}
                  onMouseOver={() => setClickedMap(true)}
                >
                  <li
                    className={`navItem pointer boldTextTitles fontSizeLarge ${
                      clickedMap ? "displayNone" : null
                    }`}
                  >
                    {t("menu.siteMap")}
                  </li>
                  <li className="navItem">
                    <Link
                      to="/"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.home")}
                    </Link>
                  </li>
                  <li className="navItem">
                    <Link
                      to="/aboutNew"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.about")}
                    </Link>
                  </li>
                  <li className="navItem">
                    <Link
                      to="/portfolio"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.portfolio")}
                    </Link>
                  </li>
                  <li className="navItem">
                    <Link
                      to="/blog"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.blog")}
                    </Link>
                  </li>
                  <li className="navItem">
                    <Link
                      to="/ventures"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.ventures")}
                    </Link>
                  </li>
                  <li className="navItem">
                    <Link
                      to="/contact"
                      className="navLinkWhite"
                      activeClassName="activeNavLink"
                    >
                      {t("menu.contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="justPaddingTop">
            <div className="rowColumFooter">
              <p className="textFooterSmall">
                {t("footer.copy")}
                <span>
                  <img
                    src={heartIcon}
                    className="heartIcon"
                    alt="love love love"
                  />
                </span>
                {t("footer.by")}&nbsp;&nbsp;
              </p>
              <p className="textFooterSmall">
                <a className="whiteHover" href="http://saturnoman.com/">
                  @theghost1980
                </a>{" "}
                |{" "}
              </p>
              <p className="textFooterSmall">
                <Link className="whiteHover" to="/tos">
                  &nbsp;&nbsp;{t("footer.terms")}
                </Link>
                &nbsp;&nbsp;|
              </p>
              <p className="textFooterSmall">
                <Link className="whiteHover" to="/credits">
                  &nbsp;&nbsp;Credits
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      )}
    />
  );
};

export default Footer;
