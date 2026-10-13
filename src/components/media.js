import React, { useState } from "react";
import Img from "gatsby-image";
import { focalToPosition, altFor } from "../utils/content";
import { useNx } from "../hooks/useNx";

// Slot de imagen único del sitio (SPEC, componente "Slot de imagen" y sección d).
// TODAS las imágenes del CMS pasan por aquí: así, si algún día se migra de
// `gatsby-image` a `gatsby-plugin-image`, solo cambia este archivo.
//
// - Del CMS: <Media image={node.coverImage} fallbackAlt={node.title} ratio="16x10" />
//   (`image` trae `fluid`, `focalPoint` y `alt`).
// - Archivo local (importado con webpack): <Media src={…} srcSet={…} sizes={…} alt={…} />.
//
// Aparición: las imágenes del CMS entran con el fundido de `gatsby-image` (de la miniatura borrosa a la nítida)
// y las locales con la clase `nx-fade`, que un script mínimo de `gatsby-ssr.js` marca como cargada al terminar
// (no depende de React, así que funciona también antes de la hidratación). Sin JavaScript se ven sin efecto.
//
// `ratio` reserva el espacio con aspect-ratio (sin saltos de diseño):
// 1x1 · 3x2 · 16x10 · 2x1 · 4x5 · hero. Sin imagen, o si falla, muestra el relleno.
// `priority` es para la imagen del LCP (carga inmediata; el resto, diferida).
// Duración del fundido de las imágenes del CMS (ms). El de las locales está en nx.css (`.nx-fade`).
const FADE_MS = 700;

const Media = ({
  image,
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  fallbackAlt,
  focal,
  fit = "cover",
  ratio = "3x2",
  className = "",
  priority = false,
  children,
}) => {
  const { t } = useNx();
  const [failed, setFailed] = useState(false);

  // `sizes` sobrescribe el del fragmento (que asume 100vw) con el ancho real del slot.
  const fluid = image && image.fluid ? (sizes ? { ...image.fluid, sizes } : image.fluid) : null;
  const point = focal || (image && image.focalPoint);
  const text = alt !== undefined ? alt : altFor(image, fallbackAlt);
  const missing = failed || (!fluid && !src);
  const position = focalToPosition(point);
  const [x, y] = position.split(" ");

  return (
    <div
      className={`nx-media nx-media--${ratio}${className ? ` ${className}` : ""}${missing ? " nx-is-missing" : ""}`}
      style={{ "--focal-x": x, "--focal-y": y }}
    >
      {fluid ? (
        <Img
          fluid={fluid}
          alt={text}
          loading={priority ? "eager" : "lazy"}
          durationFadeIn={FADE_MS}
          imgStyle={
            fit === "contain"
              ? // Logos: se ven enteros, centrados y con margen sobre fondo blanco.
                { objectFit: "contain", padding: "12%", boxSizing: "border-box", background: "#fff" }
              : { objectPosition: position }
          }
        />
      ) : src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={text}
          className="nx-fade"
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="nx-media__fallback" aria-hidden="true">
        <span className="nx-mono">{t("media.missing")}</span>
      </div>
      {children}
    </div>
  );
};

export default Media;
