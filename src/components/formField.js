import React, { useEffect, useRef } from "react";
import Icon from "./icons";
import { useNx } from "../hooks/useNx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devuelve la clave de traducción del error de un campo, o null si es válido.
export const fieldErrorKey = (value, { required, type }) => {
  const v = String(value || "").trim();
  if (required && !v) return "form.required";
  if (type === "email" && v && !EMAIL_RE.test(v)) return "form.invalidEmail";
  return null;
};

// Campo: etiqueta (con * si es obligatorio), ayuda opcional, el control y el
// mensaje de error (icono + texto) enlazado con aria-describedby.
// `children` es un único control (input / select / textarea).
export const Field = ({ id, label, required, hint, error, children }) => {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : null;
  const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className={`nx-field${error ? " nx-field--error" : ""}`}>
      <label className="nx-field__label" htmlFor={id}>
        {label}
        {required && (
          <>
            {" "}
            <span className="nx-field__req" aria-hidden="true">
              *
            </span>
          </>
        )}
      </label>
      {hint && (
        <span className="nx-field__hint" id={hintId}>
          {hint}
        </span>
      )}
      {React.cloneElement(children, {
        id,
        "aria-invalid": error ? "true" : "false",
        "aria-describedby": describedBy || undefined,
      })}
      <span className="nx-field__error" id={errorId} hidden={!error}>
        <Icon name="alert" size={16} />
        <span>{error}</span>
      </span>
    </div>
  );
};

// Resumen de errores al enviar: enlaces que llevan al campo y el foco al
// resumen cuando aparece (WCAG 3.3.1).
export const ErrorSummary = ({ errors, attempt }) => {
  const { t } = useNx();
  const ref = useRef(null);

  useEffect(() => {
    if (attempt > 0 && errors.length && ref.current) ref.current.focus();
  }, [attempt, errors.length]);

  if (!errors.length) return null;
  return (
    <div className="nx-alert nx-alert--error" tabIndex={-1} ref={ref}>
      <Icon name="alert" />
      <div>
        <span className="nx-alert__title">{t("form.errorsTitle")}</span>
        <ul>
          {errors.map((er) => (
            <li key={er.id}>
              <a
                className="nx-link"
                href={`#${er.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(er.id);
                  if (el) el.focus();
                }}
              >
                {t(er.labelKey)}: {t(er.key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
