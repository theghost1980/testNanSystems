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
// `ratio` reserva el espacio con aspect-ratio (sin saltos de diseño):
// 1x1 · 3x2 · 16x10 · 2x1 · 4x5 · hero. Sin imagen, o si falla, muestra el relleno.
// `priority` es para la imagen del LCP (carga inmediata; el resto, diferida).
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
  ratio = "3x2",
  className = "",
  priority = false,
  children,
}) => {
  const { t } = useNx();
  const [failed, setFailed] = useState(false);

  const fluid = image && image.fluid;
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
          fadeIn={false}
          imgStyle={{ objectPosition: position }}
        />
      ) : src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={text}
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
