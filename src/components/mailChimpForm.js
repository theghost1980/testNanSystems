import React, { useState } from "react";
import imgSubcription from "../media-imgs/dummy300x300-subscriptions.png";
import { useTranslation } from "react-i18next";
import FormErrorText from "./formErrorText";
import HoneypotField from "./honeypotField";
import { submitNetlifyForm, errorKind } from "../utils/netlifyForm";

const NetlifyForm = (props) => {
  const { closeCB } = props;
  const { t } = useTranslation();
  const [data, setData] = useState({
    email: "",
    botField: "",
    result: {
      result: "empty",
      msg: "",
    },
  });

  const _handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitNetlifyForm("newsletter", {
        email: data.email,
        "bot-field": data.botField,
      });

      setData({
        ...data,
        result: { result: "success", msg: t("subscribe.thanks") },
      });
    } catch (error) {
      setData({
        ...data,
        result: { result: "error", msg: error.message, kind: errorKind(error) },
      });
    }
  };

  // Vuelve al formulario conservando el correo escrito.
  const _handleRetry = () => {
    setData({
      ...data,
      result: { result: "empty", msg: "" },
    });
  };

  const _handleChange = (event) => {
    setData({
      ...data,
      email: event.target.value,
    });
  };

  const _handleChangeBot = (event) => {
    setData({
      ...data,
      botField: event.target.value,
    });
  };

  return data.result.result === "empty" ? (
    <div className="coloredScreenBGFixed relativeDiv">
      <div className="subcriptionCont" id="confettyDiv">
        <img
          src={imgSubcription}
          alt="subscribe"
          className="imgSubscriptions"
        />

        <form
          onSubmit={_handleSubmit}
          className="formSubcription"
          name="newsletter"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <HoneypotField value={data.botField} onChange={_handleChangeBot} />

          <input
            type="email"
            name="email"
            onChange={_handleChange}
            required
            className="inputMailChimp"
            placeholder={t("subscribe.emailhere")}
            value={data.email}
          />
          <br />
          <button
            name="btnSubscribe"
            className="btnSubscribe xtraSubscribeBtn"
            type="submit"
          >
            {t("subscribe.getme")}
          </button>
        </form>

        <div
          className="btnSubscribeMini positionAbs1 "
          onClick={() => closeCB()}
        >
          Close
        </div>
      </div>
    </div>
  ) : data.result.result === "success" ? (
    <div className="coloredScreenBGFixed">
      <div className="subcriptionCont">
        <img src={imgSubcription} alt="success" className="imgSubscriptions" />
        <div className="divErrorSubcriptions">
          <p>{data.result.msg}</p>
        </div>
        <div
          className="btnSubscribeMini positionAbs1 "
          onClick={() => closeCB()}
        >
          Close
        </div>
      </div>
    </div>
  ) : (
    <div className="coloredScreenBGFixed">
      <div className="subcriptionCont">
        <img src={imgSubcription} alt="error" className="imgSubscriptions" />
        <div className="divErrorSubcriptions" role="alert">
          <p>{t("subscribe.errorTitle")}</p>
          {data.result.kind === "cooldown" || data.result.kind === "daily" ? (
            <p>
              <FormErrorText kind={data.result.kind} />
            </p>
          ) : (
            <p>
              {t("subscribe.error")}{" "}
              <a href="/contact">{t("subscribe.error2")}</a>.
            </p>
          )}
          {data.result.kind !== "daily" && (
            <button
              type="button"
              className="btnSubscribe xtraSubscribeBtn"
              onClick={_handleRetry}
            >
              {t("button.retry")}
            </button>
          )}
        </div>
        <div
          className="btnSubscribeMini positionAbs1 "
          onClick={() => closeCB()}
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default NetlifyForm;
