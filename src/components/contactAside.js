import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Icon, { socialIconName } from "./icons";
import { useNx } from "../hooks/useNx";
import { CONTACT_EMAIL } from "../config/site";

// Datos de contacto: el correo solo aparece si se definió GATSBY_CONTACT_EMAIL, y las redes
// salen de DatoCMS (las mismas del pie).
const ContactAside = () => {
  const { t } = useNx();
  const data = useStaticQuery(graphql`
    query ContactSocial {
      social: allDatoCmsSocialProfile(filter: { locale: { eq: "en" } }) {
        edges {
          node {
            id
            profileType
            url
          }
        }
      }
    }
  `);
  const social = data.social.edges;
  if (!CONTACT_EMAIL && !social.length) return null;

  return (
    <aside className="nx-stack">
      {CONTACT_EMAIL && (
        <div className="nx-card nx-card--navy nx-card--pad nx-stack nx-stack--sm">
          <span className="nx-mono nx-on-band-muted">{t("contact.email")}</span>
          <a className="nx-h3" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <p className="nx-small nx-on-band-muted">{t("quickquote.wewill")}</p>
        </div>
      )}
      {social.length > 0 && (
        <div className="nx-card nx-card--pad nx-stack nx-stack--sm">
          <h2 className="nx-h4">{t("footer.contactme")}</h2>
          <ul className="nx-share">
            {social.map(({ node }) => (
              <li key={node.id}>
                <a
                  className="nx-share__btn"
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${node.profileType} ${t("a11y.externalLink")}`}
                >
                  <Icon name={socialIconName(node.profileType)} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default ContactAside;
