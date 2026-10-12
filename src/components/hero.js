import React from "react";
import Media from "./media";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";

import hero640 from "../media-imgs/redesign/hero-sala-tecnica-640.jpg";
import hero1200 from "../media-imgs/redesign/hero-sala-tecnica-1200.jpg";
import hero1800 from "../media-imgs/redesign/hero-sala-tecnica-1800.jpg";

// La imagen del hero es un archivo local del diseño (imagen de concepto
// generada con IA, ver docs/image-prompts.md), no del CMS: el carrusel antiguo
// de DatoCMS (`InfoSite.carouselHome`) trae fotos de 2020 y siempre ganaría.
// Si más adelante Ana quiere cambiarla desde el CMS, basta con sustituir esta
// fuente por `image={carouselHome[0].imageCarousel}` (el componente Media ya lo admite).
export const HERO_SRCSET = `${hero640} 640w, ${hero1200} 1200w, ${hero1800} 1800w`;
export const HERO_SIZES = "(min-width: 768px) 896px, 100vw";
// Punto focal: el centro del técnico y el armario (en móvil se recorta a 4:5).
const HERO_FOCAL = { x: 0.45, y: 0.42 };

// `yearsExperience`: si no se conoce, la tarjeta de cifra no se muestra
// (nunca se inventa un número).
const Hero = ({ yearsExperience }) => {
  const { t } = useNx();
  const { open } = useDialog();

  return (
    <section className="nx-hero nx-container" aria-labelledby="nx-hero-title">
      <div className="nx-hero__top">
        <h1 className="nx-display" id="nx-hero-title">
          <span>{t("hero.l1")}</span>
          <br />
          <span className="nx-accent">{t("hero.accent")}</span>{" "}
          <span className="nx-box">{t("hero.box")}</span>
        </h1>
        <p className="nx-lead nx-hero__lead">{t("hero.lead")}</p>
      </div>
      <div className="nx-bento">
        <figure className="nx-bento__main">
          <Media
            ratio="hero"
            className="nx-media--card nx-media--blur"
            src={hero1200}
            srcSet={HERO_SRCSET}
            sizes={HERO_SIZES}
            width={1800}
            height={1208}
            alt={t("hero.alt")}
            focal={HERO_FOCAL}
            priority
          >
            <span className="nx-media__badge nx-mono">{t("hero.fig")}</span>
            <span className="nx-media__chip nx-pill nx-pill--lg nx-pill--on-light">
              {t("hero.chip")}
            </span>
          </Media>
        </figure>
        <div className="nx-bento__col">
          {yearsExperience > 0 && (
            <div className="nx-card nx-card--blue nx-stat">
              <span className="nx-stat__num">+{yearsExperience}</span>
              <span className="nx-stat__text">{t("hero.statText")}</span>
            </div>
          )}
          <button
            className="nx-card nx-card--navy nx-cta-card"
            type="button"
            onClick={() => open("nx-quote")}
          >
            <span>{t("hero.cta")}</span>
            <span className="nx-cta-card__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
