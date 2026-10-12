import React, { useEffect, useRef } from "react";
import Icon from "./icons";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Diálogo accesible sin librería: role="dialog", aria-modal, foco atrapado
// (Tab / Shift+Tab), Esc y clic en el fondo cierran. Los hijos se montan solo
// mientras está abierto, así que sus formularios se reinician al cerrarlo.
//
// Uso: <Dialog id="nx-quote" title={…} kicker={…} size="sm">…</Dialog> (`kicker`: texto corto
// opcional sobre el título); se abre con
// useDialog().open("nx-quote", detalle).
const Dialog = ({ id, title, kicker, size, children }) => {
  const { id: openId, close } = useDialog();
  const { t } = useNx();
  const panelRef = useRef(null);
  const isOpen = openId === id;

  useEffect(() => {
    if (!isOpen) return undefined;
    const panel = panelRef.current;
    if (!panel) return undefined;

    const focusables = () =>
      Array.prototype.filter.call(
        panel.querySelectorAll(FOCUSABLE),
        (n) => n.tabIndex >= 0 && (n.offsetParent !== null || n === document.activeElement),
      );

    const first =
      panel.querySelector("[data-nx-autofocus]") || focusables()[0] || panel;
    first.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) {
        e.preventDefault();
        return;
      }
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const titleId = `${id}-title`;
  return (
    <div className="nx-dialog nx-is-open" id={id}>
      {/* Clic en el fondo = cerrar. Para teclado ya están Esc y el botón de cerrar. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="nx-dialog__backdrop" onClick={close} />
      <div
        className={`nx-dialog__panel${size === "sm" ? " nx-dialog__panel--sm" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="nx-dialog__head">
          <div>
            {kicker && <span className="nx-mono">{kicker}</span>}
            <h2 className="nx-dialog__title" id={titleId}>
              {title}
            </h2>
          </div>
          <button
            className="nx-icon-btn nx-icon-btn--close"
            type="button"
            onClick={close}
            aria-label={t("a11y.closeDialog")}
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
