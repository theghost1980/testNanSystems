import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNx } from "../hooks/useNx";

// Franja de tecnologías que se desplaza (SPEC: componente "Franja").
// Contenido fijo en código (hoy no está en el CMS); "networks" es traducible.
// Repite el grupo hasta cubrir ≥ 2× el ancho de pantalla y duplica la mitad
// (aria-hidden) para que el bucle no deje huecos; 60 px/s. Con
// `prefers-reduced-motion` el CSS la deja estática y envuelta (sin botón).
const ITEMS = ["TRIDIUM", "RED HAT LINUX", "AUTOCAD", "BMS / HVAC", "networks", "NIAGARA 4"];

const Marquee = () => {
  const { t } = useNx();
  const [copies, setCopies] = useState(1);
  const [duration, setDuration] = useState(40);
  const [paused, setPaused] = useState(false);
  const groupRef = useRef(null);

  const measure = useCallback(() => {
    const el = groupRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width || 1;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = reduce ? 1 : Math.max(1, Math.ceil((window.innerWidth * 2) / width));
    setCopies(n);
    setDuration(Math.max(20, Math.round((width * n) / 60)));
  }, []);

  // Medir el grupo original tras montar, al cambiar el tamaño de la ventana y
  // al cambiar de idioma (cambia el texto de "REDES").
  useEffect(() => {
    measure();
    let timer;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [measure, t]);

  const items = ITEMS.map((item) => (
    <React.Fragment key={item}>
      <li>{item === "networks" ? t("marquee.networks") : item}</li>
      <li className="nx-marquee__star" aria-hidden="true">
        ✦
      </li>
    </React.Fragment>
  ));

  // Solo el primer grupo de la primera mitad lo lee un lector de pantalla.
  const half = (hiddenHalf) => (
    <div className="nx-marquee__half" aria-hidden={hiddenHalf ? "true" : undefined}>
      {Array.from({ length: copies }).map((_, i) => {
        const original = i === 0 && !hiddenHalf;
        return (
          <ul
            className="nx-marquee__group"
            key={i}
            ref={original ? groupRef : undefined}
            aria-hidden={original ? undefined : "true"}
          >
            {items}
          </ul>
        );
      })}
    </div>
  );

  const icon = (name, path) => (
    <svg
      className={name}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );

  return (
    <section
      className={`nx-marquee${paused ? " nx-is-paused" : ""}`}
      aria-label={t("a11y.marquee")}
      style={{ "--marquee-duration": `${duration}s` }}
    >
      <div className="nx-marquee__track">
        {half(false)}
        {half(true)}
      </div>
      <button
        className="nx-icon-btn nx-marquee__pause"
        type="button"
        aria-pressed={paused ? "true" : "false"}
        aria-label={t("a11y.pauseMarquee")}
        onClick={() => setPaused((p) => !p)}
      >
        {icon("nx-ico-pause", "M8 5v14M16 5v14")}
        {icon("nx-ico-play", "M7 5l12 7-12 7z")}
      </button>
    </section>
  );
};

export default Marquee;
