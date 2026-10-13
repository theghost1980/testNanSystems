import React, { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import Icon from "./icons";
import HoneypotField from "./honeypotField";
import FormErrorText from "./formErrorText";
import { ErrorSummary, Field, fieldErrorKey } from "./formField";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { submitNetlifyForm, errorKind } from "../utils/netlifyForm";

// Los campos empiezan vacíos: lo que el usuario no rellena se envía vacío, nunca
// con datos de prueba (A1).
const EMPTY = {
  name: "",
  email: "",
  phone: "",
  callme: "",
  comments: "",
  company: "",
  job: "",
  "bot-field": "",
};

const QuoteForm = ({ serviceTitle }) => {
  const { t } = useNx();
  const { close } = useDialog();
  const [values, setValues] = useState(EMPTY);
  const [companyUser, setCompanyUser] = useState(false);
  const [errors, setErrors] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [kind, setKind] = useState("send");
  const resultRef = useRef(null);
  const formRef = useRef(null);

  // Al terminar (enviado o error) el foco va al título del resultado.
  useEffect(() => {
    if ((status === "sent" || status === "error") && resultRef.current) {
      resultRef.current.focus();
    }
  }, [status]);

  const errorOf = (name) => {
    const found = errors.find((e) => e.name === name);
    return found ? t(found.key) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev.filter((er) => er.name !== name));
  };

  const validate = () => {
    const list = [];
    const check = (name, id, labelKey, rules) => {
      const key = fieldErrorKey(values[name], rules);
      if (key) list.push({ name, id, labelKey, key });
    };
    check("name", "q-name", "quickquote.name", { required: true });
    check("email", "q-email", "quickquote.email", { required: true, type: "email" });
    if (companyUser) {
      check("company", "q-company", "quickquote.company", { required: true });
      check("job", "q-job", "quickquote.job", { required: true });
    }
    check("comments", "q-comments", "quickquote.comments", { required: true });
    return list;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const list = validate();
    setErrors(list);
    setAttempt((n) => n + 1);
    if (list.length) return;

    setStatus("sending");
    try {
      await submitNetlifyForm("quote", {
        quote: serviceTitle || t("quickquote.title"),
        companyUser: companyUser ? "It was a company User" : "It was a home user",
        // Si no es usuario de empresa, empresa y cargo viajan vacíos.
        company: companyUser ? values.company : "",
        job: companyUser ? values.job : "",
        name: values.name,
        email: values.email,
        phone: values.phone,
        callme: values.callme,
        // La fecha es la del envío, no la de cuando se abrió el formulario.
        dateTime: new Date().toString(),
        comments: values.comments,
        "bot-field": values["bot-field"],
      });
      setStatus("sent");
    } catch (err) {
      const k = errorKind(err);
      if (k === "send") {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err,
        );
      }
      setKind(k);
      setStatus("error");
    }
  };

  const retry = () => {
    setStatus("idle");
    window.setTimeout(() => {
      // Nunca el primer input a secas: ese es el campo trampa (honeypot).
      const first = formRef.current && formRef.current.querySelector("[data-nx-autofocus]");
      if (first) first.focus();
    }, 0);
  };

  if (status === "sending") {
    return (
      <div className="nx-dialog__state" role="status" aria-live="polite">
        <span className="nx-spinner" aria-hidden="true" />
        <p className="nx-h4">{t("quickquote.sending")}</p>
        <p className="nx-muted">{t("quickquote.ourobots")}</p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="nx-dialog__state nx-dialog__state--ok" role="status" aria-live="polite">
        <Icon name="check" size={48} />
        <p className="nx-h3" tabIndex={-1} ref={resultRef}>
          {t("quickquote.sent")}
        </p>
        <p className="nx-muted">{t("quickquote.wewill")}</p>
        <button className="nx-btn nx-btn--primary" type="button" onClick={close}>
          {t("button.close")}
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="nx-dialog__state nx-dialog__state--err" role="alert">
        <Icon name="alert" size={48} />
        <p className="nx-h3" tabIndex={-1} ref={resultRef}>
          {t("quickquote.errorTitle")}
        </p>
        <p className="nx-muted">
          <FormErrorText kind={kind} sendKey="quickquote.errorText" />
        </p>
        <div className="nx-form__actions">
          {kind !== "daily" && (
            <button className="nx-btn nx-btn--coral" type="button" onClick={retry}>
              {t("button.retry")}
            </button>
          )}
          <button className="nx-btn nx-btn--ghost" type="button" onClick={close}>
            {t("button.close")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nx-stack">
      <p className="nx-small nx-muted">{t("form.requiredNote")}</p>
      {serviceTitle && (
        <p className="nx-pill nx-pill--blue">
          {t("quickquote.service")}: <strong>{serviceTitle}</strong>
        </p>
      )}
      <form className="nx-form" onSubmit={handleSubmit} noValidate ref={formRef}>
        <HoneypotField value={values["bot-field"]} onChange={handleChange} />
        <ErrorSummary errors={errors} attempt={attempt} />

        <label className="nx-check">
          <input
            type="checkbox"
            name="companyUser"
            checked={companyUser}
            onChange={(e) => setCompanyUser(e.target.checked)}
          />{" "}
          <span>{t("quickquote.companyUser")}</span>
        </label>

        {companyUser && (
          <div className="nx-form__row nx-form__row--2">
            <Field id="q-company" label={t("quickquote.company")} required error={errorOf("company")}>
              <input
                className="nx-input"
                name="company"
                type="text"
                value={values.company}
                onChange={handleChange}
                placeholder={t("quickquote.companyh")}
                autoComplete="organization"
              />
            </Field>
            <Field id="q-job" label={t("quickquote.job")} required error={errorOf("job")}>
              <input
                className="nx-input"
                name="job"
                type="text"
                value={values.job}
                onChange={handleChange}
                placeholder={t("quickquote.jobth")}
                autoComplete="organization-title"
              />
            </Field>
          </div>
        )}

        <div className="nx-form__row nx-form__row--2">
          <Field id="q-name" label={t("quickquote.name")} required error={errorOf("name")}>
            <input
              className="nx-input"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder={t("quickquote.nameh")}
              autoComplete="name"
              data-nx-autofocus
            />
          </Field>
          <Field id="q-email" label={t("quickquote.email")} required error={errorOf("email")}>
            <input
              className="nx-input"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder={t("quickquote.emailh")}
              autoComplete="email"
            />
          </Field>
        </div>

        <div className="nx-form__row nx-form__row--2">
          <Field id="q-phone" label={t("quickquote.phone")} error={errorOf("phone")}>
            <input
              className="nx-input"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              placeholder={t("quickquote.phoneh")}
              autoComplete="tel"
            />
          </Field>
          <Field id="q-call" label={t("quickquote.callme")} hint={t("quickquote.call")}>
            {/* Regla obsoleta: en un select de React, onChange es lo correcto. */}
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select className="nx-select" name="callme" value={values.callme} onChange={handleChange}>
              <option value="">—</option>
              <option value={t("quickquote.callB")}>{t("quickquote.callB")}</option>
              <option value={t("quickquote.callA")}>{t("quickquote.callA")}</option>
              <option value={t("quickquote.iwill")}>{t("quickquote.iwill")}</option>
            </select>
          </Field>
        </div>

        <Field id="q-comments" label={t("quickquote.comments")} required error={errorOf("comments")}>
          <textarea
            className="nx-textarea"
            name="comments"
            value={values.comments}
            onChange={handleChange}
            placeholder={t("quickquote.commentsh")}
          />
        </Field>

        <div className="nx-form__actions">
          <button className="nx-btn nx-btn--coral" type="submit">
            {t("quickquote.send")}
          </button>
          <button className="nx-btn nx-btn--ghost" type="button" onClick={close}>
            {t("quickquote.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

// Diálogo global de cotización: se abre con useDialog().open("nx-quote", título del servicio).
const QuoteDialog = () => {
  const { t } = useNx();
  const { detail } = useDialog();
  return (
    <Dialog id="nx-quote" title={t("quickquote.title")}>
      <QuoteForm serviceTitle={detail} />
    </Dialog>
  );
};

export default QuoteDialog;
