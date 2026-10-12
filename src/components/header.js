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
      <span className="nx-logo__dot" aria-hidden="true" />
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
  // ventana (≥ 960 px) se cierra solo.
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
    const media = window.matchMedia("(min-width: 960px)");
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
