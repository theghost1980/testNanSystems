import React, { useState, useRef } from "react";

import { useTranslation } from "react-i18next";
import FormErrorText from "./formErrorText";
import HoneypotField from "./honeypotField";
import { submitNetlifyForm, errorKind } from "../utils/netlifyForm";
import robotImg from "../media-imgs/robot.png";
import bottomImg from "../media-imgs/lineBG.png";

// Los campos empiezan vacíos: lo que el usuario no rellena se envía vacío,
// nunca con datos de prueba.
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  comments: "",
  company: "",
  job: "",
  callme: "",
};

const QuickQuote = (props) => {
  const refForm = useRef(null);

  const { t } = useTranslation();

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("send");
  // Sin título (formulario abierto desde una página sin servicio) se usa un
  // texto genérico: antes llegaba "undefined" en el correo.
  const _titleQuote = props.quote || t("quickquote.title");
  const [companyUser, setcompanyUser] = useState(true);
  const [data, setData] = useState({ ...EMPTY_FORM });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "companyUser") {
      setcompanyUser(e.target.checked);
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: String(value),
      }));
    }
  };

  const resetForm = () => {
    setData({ ...EMPTY_FORM });
    setError(false);
    refForm.current.reset();
  };

  function clearAll() {
    setSending(false);
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError(false);
    setSending(true);

    sendFeedback({
      quote: _titleQuote,
      companyUser: companyUser
        ? "It was a company User"
        : "It was a home user",
      // Si no es usuario de empresa, empresa y cargo viajan vacíos.
      company: companyUser ? data.company : "",
      job: companyUser ? data.job : "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      callme: data.callme,
      // La fecha es la del envío, no la de cuando se montó el formulario.
      dateTime: new Date().toString(),
      comments: data.comments,
      // Honeypot: lo rellenan los bots, nunca una persona (handleChange lo guarda por su nombre).
      "bot-field": data["bot-field"] || "",
    });
  }

  function messageSentSuccess() {
    resetForm();
    setSent(true);
    setTimeout(clearAll, 5500);
  }

  function sendFeedback(fields) {
    submitNetlifyForm("quote", fields)
      .then(() => {
        messageSentSuccess();
      })
      .catch((err) => {
        const kind = errorKind(err);
        if (kind === "send") {
          console.error(
            "Oh well, you failed. Here some thoughts on the error that occured:",
            err,
          );
        }
        // Antes `sending` se quedaba en true: formulario bloqueado para siempre.
        setSending(false);
        setErrorType(kind);
        setError(true);
      });
  }

  return (
    <div className="quoteCont">
      <h1 className="titleItemVenture">{_titleQuote}</h1>
      <label className="lbl-checkBoxQuote boldLblInputs">
        {t("quickquote.companyUser")}{" "}
        <input
          type="checkbox"
          name="companyUser"
          onChange={handleChange}
          checked={companyUser}
          disabled={sending}
        />
      </label>
      <form
        onSubmit={handleSubmit}
        ref={refForm}
        className="formQuote"
        id="form-Quote"
      >
        <HoneypotField value={data["bot-field"]} onChange={handleChange} />
        <div className="rowCont">
          <div className="labelsCont">
            <p className="lblFormQuote boldLblInputs">{t("quickquote.name")}</p>
            <p className="lblFormQuote boldLblInputs">
              {t("quickquote.phone")}
            </p>
            <p className="lblFormQuote boldLblInputs">
              {t("quickquote.callme")}
            </p>
            <span className={`labelSpan ${companyUser ? null : "hideLabels"}`}>
              <p className="lblFormQuote boldLblInputs">
                {t("quickquote.company")}
              </p>
              <p className="lblFormQuote boldLblInputs">
                {t("quickquote.job")}
              </p>
            </span>
            <p className="lblFormQuote boldLblInputs">
              {t("quickquote.email")}
            </p>
            <p className="lblFormQuote boldLblInputs">
              {t("quickquote.comments")}
            </p>
          </div>
          <div className="inputsCont">
            <input
              id="test-name"
              name="name"
              onChange={handleChange}
              placeholder={t("quickquote.nameh")}
              required
              className="inputForm boldLblInputs"
              disabled={sending}
            />
            <input
              id="test-phone"
              name="phone"
              onChange={handleChange}
              placeholder={t("quickquote.phoneh")}
              className="inputForm boldLblInputs"
              disabled={sending}
            />
            <select
              id="test-callme"
              name="callme"
              defaultValue=""
              onChange={handleChange}
              className="inputForm boldLblInputs"
              disabled={sending}
              form="form-Quote"
            >
              <option value="" disabled>
                {t("quickquote.call")}
              </option>
              <option value={t("quickquote.callB")}>
                {t("quickquote.callB")}
              </option>
              <option value={t("quickquote.callA")}>
                {t("quickquote.callA")}
              </option>
              <option value={t("quickquote.iwill")}>
                {t("quickquote.iwill")}
              </option>
            </select>
            <span
              className={`inputSpan ${companyUser ? null : "hideInputSpans"}`}
            >
              <input
                id="test-company"
                name="company"
                onChange={handleChange}
                placeholder={t("quickquote.companyh")}
                required={companyUser}
                className="inputForm boldLblInputs"
                disabled={sending}
              />
              <input
                id="test-job"
                name="job"
                onChange={handleChange}
                placeholder={t("quickquote.jobth")}
                required={companyUser}
                className="inputForm boldLblInputs"
                disabled={sending}
              />
            </span>
            <input
              id="test-email"
              name="email"
              onChange={handleChange}
              placeholder={t("quickquote.emailh")}
              type="email"
              required
              className="inputForm boldLblInputs"
              disabled={sending}
            />
            <textarea
              id="test-mailing"
              name="comments"
              onChange={handleChange}
              placeholder={t("quickquote.commentsh")}
              required
              className="inputForm boldLblInputs"
              disabled={sending}
            />
          </div>
        </div>
        <div className="btnCont">
          {error && !sending && (
            <p className="divErrorSubcriptions" role="alert">
              {t("quickquote.errorTitle")}{" "}
              <FormErrorText kind={errorType} sendKey="quickquote.errorText" />
            </p>
          )}
          {!sending && (
            <div className="btnRowCont">
              <input
                type="submit"
                value={t("quickquote.send")}
                className="btnForm"
              />
              <input
                type="reset"
                value={t("quickquote.cancel")}
                className="btnForm"
                onClick={resetForm}
              />
            </div>
          )}
          {sending && !sent && (
            <div className="divFloatMessageQuote">
              <p className="titleItemVenture biggerText">
                {t("quickquote.sending")}
              </p>
              <p className="titleItemVenture biggerText">
                {t("quickquote.ourobots")}
              </p>
              <img
                src={robotImg}
                alt="working for you"
                className="robotQuote"
              />
            </div>
          )}
          {sent && (
            <div className="divFloatMessageQuote">
              <p className="titleItemVenture biggerText">
                {t("quickquote.sent")}
              </p>
              <p className="titleItemVenture biggerText">
                {t("quickquote.wewill")}
              </p>
              <div className="fancyDivSepCont">
                <img
                  src={bottomImg}
                  alt="fancy Line Sep"
                  className="imgLineSep"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuickQuote;
