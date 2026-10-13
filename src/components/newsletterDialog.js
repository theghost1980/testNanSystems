import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import Dialog from "./dialog";
import Icon from "./icons";
import HoneypotField from "./honeypotField";
import FormErrorText from "./formErrorText";
import { ErrorSummary, Field, fieldErrorKey } from "./formField";
import { useDialog } from "../hooks/useDialog";
import { useNx } from "../hooks/useNx";
import { submitNetlifyForm, errorKind } from "../utils/netlifyForm";

const NewsletterForm = () => {
  const { t } = useNx();
  const { close } = useDialog();
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [errors, setErrors] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [kind, setKind] = useState("send");
  const resultRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if ((status === "sent" || status === "error") && resultRef.current) {
      resultRef.current.focus();
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = fieldErrorKey(email, { required: true, type: "email" });
    setErrors(key ? [{ name: "email", id: "nl-email", labelKey: "quickquote.email", key }] : []);
    setAttempt((n) => n + 1);
    if (key) return;

    setStatus("sending");
    try {
      await submitNetlifyForm("newsletter", { email, "bot-field": botField });
      setStatus("sent");
    } catch (err) {
      const k = errorKind(err);
      if (k === "send") {
        console.error("The newsletter subscription could not be sent:", err);
      }
      setKind(k);
      setStatus("error");
    }
  };

  const retry = () => {
    setStatus("idle");
    window.setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  if (status === "sending") {
    return (
      <div className="nx-dialog__state" role="status" aria-live="polite">
        <span className="nx-spinner" aria-hidden="true" />
        <p className="nx-h4">{t("contact.sending")}</p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="nx-dialog__state nx-dialog__state--ok" role="status" aria-live="polite">
        <Icon name="check" size={48} />
        <p className="nx-h3" tabIndex={-1} ref={resultRef}>
          {t("subscribe.thanks")}
        </p>
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
          {t("subscribe.errorTitle")}
        </p>
        <p className="nx-muted">
          {kind === "send" ? (
            <>
              {t("subscribe.error")}{" "}
              <Link className="nx-link" to="/contact" onClick={close}>
                {t("subscribe.error2")}
              </Link>
              .
            </>
          ) : (
            <FormErrorText kind={kind} />
          )}
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
    <div className="nx-stack nx-stack--sm">
      <p className="nx-muted">{t("subscribe.text")}</p>
      <form className="nx-form" onSubmit={handleSubmit} noValidate>
        <HoneypotField value={botField} onChange={(e) => setBotField(e.target.value)} />
        <ErrorSummary errors={errors} attempt={attempt} />
        <Field
          id="nl-email"
          label={t("quickquote.email")}
          required
          error={errors.length ? t(errors[0].key) : null}
        >
          <input
            className="nx-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors([]);
            }}
            placeholder={t("subscribe.emailhere")}
            autoComplete="email"
            ref={inputRef}
            data-nx-autofocus
          />
        </Field>
        <div className="nx-form__actions">
          <button className="nx-btn nx-btn--coral" type="submit">
            {t("subscribe.getme")}
          </button>
          <button className="nx-btn nx-btn--ghost" type="button" onClick={close}>
            {t("contact.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

// Diálogo global del boletín: se abre con useDialog().open("nx-newsletter").
const NewsletterDialog = () => {
  const { t } = useNx();
  return (
    <Dialog id="nx-newsletter" title={t("subscribe.getgood")} size="sm">
      <NewsletterForm />
    </Dialog>
  );
};

export default NewsletterDialog;
