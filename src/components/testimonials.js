import React from "react";
import Media from "./media";
import Icon, { socialIconName } from "./icons";
import { useNx } from "../hooks/useNx";

// Testimonios de la home: el primero destacado (coral), el resto planos.
// Sin registros no se renderiza nada (la sección completa desaparece).
// `items` son nodos de DatoCMS `Testimony` ya filtrados por idioma.
const Testimonials = ({ items }) => {
  const { t } = useNx();
  if (!items || !items.length) return null;

  return (
    <section className="nx-section nx-section--tight nx-container" aria-labelledby="nx-testi-title">
      <div className="nx-section__head">
        <h2 className="nx-h2" id="nx-testi-title">
          {t("testimony.title")}
        </h2>
      </div>
      <div className="nx-grid nx-grid--3">
        {items.map(({ node }, i) => {
          const html = node.contentNode && node.contentNode.childMarkdownRemark.html;
          return (
            <figure
              key={node.id}
              className={`nx-card ${i === 0 ? "nx-card--coral nx-testi nx-testi--featured" : "nx-card--flat nx-testi"}`}
            >
              <span className="nx-testi__mark" aria-hidden="true">
                “
              </span>
              <blockquote className="nx-testi__quote">{node.title}</blockquote>
              {html && (
                <div
                  className={`nx-testi__body nx-prose nx-prose--sm${i === 0 ? " nx-prose--on-coral" : ""}`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )}
              <figcaption className="nx-testi__who">
                <Media
                  image={node.profilePicture}
                  fallbackAlt=""
                  ratio="1x1"
                  className="nx-testi__avatar nx-media--round"
                />
                <span>
                  <span className="nx-testi__name">{node.name}</span>
                  {node.urlProfile && (
                    <a className="nx-testi__social" href={node.urlProfile} rel="noopener noreferrer" target="_blank">
                      <Icon name={socialIconName(node.urlProfile)} size={18} />
                      <span>{t("testimony.profile")}</span>
                    </a>
                  )}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
