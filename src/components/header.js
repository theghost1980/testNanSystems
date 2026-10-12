import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import Icon from "./icons";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { useTheme } from "../hooks/useTheme";

export const NAV = [
  ["/", "menu.home"],
  ["/aboutNew", "menu.about"],
  ["/portfolio", "menu.portfolio"],
  ["/blog", "menu.blog"],
  ["/ventures", "menu.ventures"],
  ["/contact", "menu.contact"],
];

// Los dos engranajes del logo anterior (grande 8 dientes, pequeño 6), dibujados a mano en
// un viewBox 36x30 con los dientes engranados: al girar uno un diente, el otro gira un diente
// en sentido contrario (45° y -60°). Decorativos: el nombre accesible lo da el enlace.
const GEAR_BIG =
  "M21.02 14.18 L20.73 15.50 L22.61 17.33 L21.22 19.71 L18.70 18.96 L17.69 19.86 L16.55 20.58 L16.59 23.21 L13.92 23.91 L12.67 21.60 L11.32 21.52 L10.00 21.23 L8.17 23.11 L5.79 21.72 L6.54 19.20 L5.64 18.19 L4.92 17.05 L2.29 17.09 L1.59 14.42 L3.90 13.17 L3.98 11.82 L4.27 10.50 L2.39 8.67 L3.78 6.29 L6.30 7.04 L7.31 6.14 L8.45 5.42 L8.41 2.79 L11.08 2.09 L12.33 4.40 L13.68 4.48 L15.00 4.77 L16.83 2.89 L19.21 4.28 L18.46 6.80 L19.36 7.81 L20.08 8.95 L22.71 8.91 L23.41 11.58 L21.10 12.83Z M8.30 13.00 a4.2 4.2 0 1 0 8.4 0 a4.2 4.2 0 1 0 -8.4 0Z";
const GEAR_SMALL =
  "M31.69 18.83 L32.15 19.87 L33.91 20.38 L33.89 22.71 L32.12 23.20 L31.66 24.23 L30.99 25.14 L31.43 26.92 L29.40 28.08 L28.09 26.79 L26.96 26.90 L25.84 26.77 L24.52 28.04 L22.50 26.86 L22.96 25.09 L22.31 24.17 L21.85 23.13 L20.09 22.62 L20.11 20.29 L21.88 19.80 L22.34 18.77 L23.01 17.86 L22.57 16.08 L24.60 14.92 L25.91 16.21 L27.04 16.10 L28.16 16.23 L29.48 14.96 L31.50 16.14 L31.04 17.91Z M24.40 21.50 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0Z";

const trim = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

// Inicio solo es "actual" en la home; el resto también en sus subpáginas
// (p. ej. /blog/<post> mantiene marcado Blog).
const isCurrent = (path, to) => {
  const p = trim(path);
  return to === "/" ? p === "/" : p === to || p.startsWith(`${to}/`);
};

export const Logo = ({ className = "" }) => {
  const { t } = useNx();
  return (
    <Link className={`nx-logo ${className}`} to="/" aria-label={t("a11y.logo")}>
      <span className="nx-logo__light">NaN</span>
      <span className="nx-logo__bold">SYSTEMS</span>
      <svg className="nx-logo__gears" viewBox="0 0 36 30" aria-hidden="true" focusable="false">
        <path className="nx-logo__gear nx-logo__gear--big" d={GEAR_BIG} fillRule="evenodd" />
        <path className="nx-logo__gear nx-logo__gear--small" d={GEAR_SMALL} fillRule="evenodd" />
      </svg>
    </Link>
  );
};

const Header = () => {
  const { t, lang, i18n } = useNx();
  const { theme, toggle } = useTheme();
  const { open } = useDialog();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Esc cierra el menú móvil y devuelve el foco al botón; al ensanchar la
  // ventana (≥ 1100 px, el mismo punto de corte que el CSS) se cierra solo.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        const btn = document.querySelector("[data-nx-menu-toggle]");
        if (btn) btn.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia("(min-width: 1100px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else if (media.removeListener) media.removeListener(onChange);
    };
  }, []);

  const quote = () => {
    setMenuOpen(false);
    open("nx-quote");
  };

  return (
    <header className="nx-header" data-nx-page>
      <div className="nx-container nx-header__inner">
        <Logo />
        <nav
          className={`nx-nav${menuOpen ? " nx-is-open" : ""}`}
          id="nx-nav"
          aria-label={t("a11y.mainNav")}
        >
          <ul className="nx-nav__list">
            {NAV.map(([to, key]) => (
              <li key={to}>
                <Link
                  className="nx-nav__link"
                  to={to}
                  aria-current={isCurrent(pathname, to) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="nx-btn nx-btn--primary nx-nav__cta-mobile"
            type="button"
            onClick={quote}
          >
            {t("button.quote")}
          </button>
        </nav>
        <div className="nx-header__actions">
          <button
            className="nx-icon-btn"
            type="button"
            onClick={() => i18n.changeLanguage(lang === "es" ? "en" : "es")}
            aria-label={t("a11y.langToggle")}
          >
            <span>{lang.toUpperCase()}</span>&nbsp;/&nbsp;
            <span className="nx-icon-btn__off">{lang === "es" ? "EN" : "ES"}</span>
          </button>
          <button
            className="nx-icon-btn nx-theme-btn"
            type="button"
            onClick={toggle}
            aria-label={t(theme === "dark" ? "a11y.themeLight" : "a11y.themeDark")}
          >
            <Icon name="sun" className="nx-theme-btn__sun" />
            <Icon name="moon" className="nx-theme-btn__moon" />
          </button>
          <button
            className="nx-btn nx-btn--primary nx-btn--sm nx-header__cta"
            type="button"
            onClick={quote}
          >
            {t("button.quote")}
          </button>
          <button
            className="nx-icon-btn nx-menu-btn"
            type="button"
            data-nx-menu-toggle
            aria-controls="nx-nav"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label={t(menuOpen ? "a11y.menuClose" : "a11y.menuOpen")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name="menu" size={22} className="nx-menu-btn__open" />
            <Icon name="close" size={22} className="nx-menu-btn__close" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
