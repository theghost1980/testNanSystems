import { useCallback, useEffect, useState } from "react";

// Tema claro/oscuro: preferencia guardada > sistema. Sin JavaScript (o sin
// preferencia guardada) el CSS sigue `prefers-color-scheme` por sí solo; el
// script de gatsby-ssr.js pone `data-theme` antes de pintar si hay preferencia.
const STORAGE_KEY = "nan-theme";

const read = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
};

const write = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    // sin almacenamiento: el tema vale solo para esta visita
  }
};

export const useTheme = () => {
  // Primer render = lo que genera el HTML estático (claro); el real, tras montar.
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

    const current = () => {
      const attr = root.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") return attr;
      return media && media.matches ? "dark" : "light";
    };
    setTheme(current());

    // Sin preferencia guardada, la etiqueta del botón sigue al sistema.
    const onChange = (e) => {
      if (!read()) setTheme(e.matches ? "dark" : "light");
    };
    if (media) {
      if (media.addEventListener) media.addEventListener("change", onChange);
      else if (media.addListener) media.addListener(onChange);
    }
    return () => {
      if (!media) return;
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else if (media.removeListener) media.removeListener(onChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    write(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
};

export default useTheme;
