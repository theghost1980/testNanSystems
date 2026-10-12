import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import Icon from "../components/icons";
import ContactAside from "../components/contactAside";
import HoneypotField from "../components/honeypotField";
import FormErrorText from "../components/formErrorText";
import { ErrorSummary, Field, fieldErrorKey } from "../components/formField";
import { useNx } from "../hooks/useNx";
import { submitNetlifyForm, errorKind } from "../utils/netlifyForm";

// Los campos empiezan vacíos. `bot-field` es el campo trampa (honeypot).
const EMPTY = { name: "", email: "", message: "", "bot-field": "" };

const ContactForm = () => {
  const { t } = useNx();
  const [values, setValues] = useState(EMPTY);
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
    check("name", "c-name", "contact.name", { required: true });
    check("email", "c-email", "contact.email", { required: true, type: "email" });
    check("message", "c-message", "contact.feedback", { required: true });
    return list;
  };

  const focusFirst = () => {
    window.setTimeout(() => {
      // Nunca el primer input a secas: ese es el campo trampa (honeypot).
      const first = formRef.current && formRef.current.querySelector("[data-nx-autofocus]");
      if (first) first.focus();
    }, 0);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors([]);
    setStatus("idle");
    focusFirst();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const list = validate();
    setErrors(list);
    setAttempt((n) => n + 1);
    if (list.length) return;

    setStatus("sending");
    try {
      await submitNetlifyForm("contact", {
        name: values.name,
        email: values.email,
        message: values.message,
        "bot-field": values["bot-field"],
      });
      setStatus("sent");
    } catch (err) {
      const k = errorKind(err);
      if (k === "send") {
        console.error("Oh well, you failed. Here some thoughts on the error that occured:", err);
      }
      setKind(k);
      setStatus("error");
    }
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
          {t("contact.sentOne")}
        </p>
        <p className="nx-muted">{t("contact.sentTwo")}</p>
        <button className="nx-btn nx-btn--primary" type="button" onClick={reset}>
          {t("button.sendAnother")}
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="nx-dialog__state nx-dialog__state--err" role="alert">
        <Icon name="alert" size={48} />
        <p className="nx-h3" tabIndex={-1} ref={resultRef}>
          {t("contact.errorTitle")}
        </p>
        <p className="nx-muted">
          <FormErrorText kind={kind} sendKey="contact.errorText" />
        </p>
        {kind !== "daily" && (
          <button
            className="nx-btn nx-btn--coral"
            type="button"
            onClick={() => {
              setStatus("idle");
              focusFirst();
            }}
          >
            {t("button.retry")}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="nx-stack">
      <p className="nx-small nx-muted">{t("form.requiredNote")}</p>
      <form className="nx-form" onSubmit={handleSubmit} noValidate ref={formRef}>
        <HoneypotField value={values["bot-field"]} onChange={handleChange} />
        <ErrorSummary errors={errors} attempt={attempt} />
        <div className="nx-form__row nx-form__row--2">
          <Field id="c-name" label={t("contact.name")} required error={errorOf("name")}>
            <input
              className="nx-input"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder={t("contact.inputName")}
              autoComplete="name"
              data-nx-autofocus
            />
          </Field>
          <Field id="c-email" label={t("contact.email")} required error={errorOf("email")}>
            <input
              className="nx-input"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder={t("contact.inputEmail")}
              autoComplete="email"
            />
          </Field>
        </div>
        <Field id="c-message" label={t("contact.feedback")} required error={errorOf("message")}>
          <textarea
            className="nx-textarea"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder={t("contact.inputFeedback")}
          />
        </Field>
        <div className="nx-form__actions">
          <button className="nx-btn nx-btn--coral" type="submit">
            {t("contact.submit")}
          </button>
          <button className="nx-btn nx-btn--ghost" type="button" onClick={reset}>
            {t("contact.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

const Contact = ({ data }) => {
  const { t, lang } = useNx();
  const L = lang === "en" ? "en" : "es";
  const seo = data[`dataSEO_${L}`];

  return (
    <Layout>
      {seo && <HelmetDatoCms seo={seo.seoMetaTags} />}
      <section className="nx-page-head nx-container" aria-labelledby="nx-c-title">
        <h1 className="nx-h1" id="nx-c-title">
          {t("menu.contact")}
        </h1>
        <p className="nx-lead">{t("contact.intro")}</p>
      </section>
      <section className="nx-section nx-section--tight nx-container" aria-label={t("menu.contact")}>
        <div className="nx-two-col nx-two-col--rev">
          <div className="nx-card nx-card--pad">
            <ContactForm />
          </div>
          <ContactAside />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

export const data = graphql`
  query {
    dataSEO_en: datoCmsSeoContact(locale: { eq: "en" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    dataSEO_es: datoCmsSeoContact(locale: { eq: "es" }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
