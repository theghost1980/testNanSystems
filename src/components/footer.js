import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Icon, { socialIconName } from "./icons";
import { Logo, NAV } from "./header";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";

const Footer = () => {
  const { t, lang } = useNx();
  const { open } = useDialog();
  const data = useStaticQuery(graphql`
    query FooterData {
      social: allDatoCmsSocialProfile(filter: { locale: { eq: "en" } }) {
        edges {
          node {
            id
            profileType
            url
          }
        }
      }
      services_es: allDatoCmsTechnology(filter: { locale: { eq: "es" } }) {
        edges {
          node {
            id
            shortTitle
            slug
          }
        }
      }
      services_en: allDatoCmsTechnology(filter: { locale: { eq: "en" } }) {
        edges {
          node {
            id
            shortTitle
            slug
          }
        }
      }
    }
  `);

  const services = (lang === "en" ? data.services_en : data.services_es).edges;
  const year = new Date().getFullYear();

  return (
    <footer className="nx-footer nx-container">
      <div className="nx-footer__top">
        <div className="nx-footer__brand">
          <Logo />
          <p className="nx-footer__desc">{t("footer.desc")}</p>
          {data.social.edges.length > 0 && (
            <nav aria-label={t("footer.social")}>
              <ul className="nx-social">
                {data.social.edges.map(({ node }) => (
                  <li key={node.id}>
                    <a
                      className="nx-social__link"
                      href={node.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={node.profileType}
                    >
                      <Icon name={socialIconName(node.profileType)} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <div className="nx-footer__cols">
          <nav aria-label={t("footer.ourserv")}>
            <h2 className="nx-footer__heading">{t("footer.ourserv")}</h2>
            <ul className="nx-footer__links">
              {services.map(({ node }) => (
                <li key={node.id}>
                  <Link className="nx-footer__link" to={`/${node.slug}`}>
                    {node.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("menu.siteMap")}>
            <h2 className="nx-footer__heading">{t("menu.siteMap")}</h2>
            <ul className="nx-footer__links">
              {NAV.map(([to, key]) => (
                <li key={to}>
                  <Link className="nx-footer__link" to={to}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="nx-footer__heading">{t("footer.legal")}</h2>
            <ul className="nx-footer__links">
              <li>
                <Link className="nx-footer__link nx-footer__link--muted" to="/tos">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link className="nx-footer__link nx-footer__link--muted" to="/privacy">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link className="nx-footer__link nx-footer__link--muted" to="/credits">
                  {t("footer.credits")}
                </Link>
              </li>
            </ul>
            <button
              className="nx-btn nx-btn--ghost nx-btn--sm nx-mt-sm"
              type="button"
              onClick={() => open("nx-newsletter")}
            >
              {t("subscribe.getgood")}
            </button>
          </div>
        </div>
      </div>
      <div className="nx-footer__bottom">
        <span>
          <span>{t("footer.copy")}</span>
          <span aria-hidden="true">♥</span>
          <span>{t("footer.by")}</span>
          <a className="nx-link" href="https://github.com/theghost1980/" rel="noopener noreferrer">
            @theghost1980
          </a>
        </span>
        <span>
          © {year} NaNSYSTEMS · {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
