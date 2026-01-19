import React, { useState } from "react";
import imgSubcription from "../media-imgs/dummy300x300-subscriptions.png";
import { useTranslation } from "react-i18next";

const NetlifyForm = (props) => {
  const { closeCB } = props;
  const { t } = useTranslation();
  const [data, setData] = useState({
    email: "",
    result: {
      result: "empty",
      msg: "",
    },
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "newsletter",
          email: data.email,
        }),
      });

      setData({
        ...data,
        result: { result: "success", msg: t("subscribe.thanks") },
      });
    } catch (error) {
      setData({
        ...data,
        result: { result: "error", msg: error.message },
      });
    }
  };

  const _handleChange = (event) => {
    setData({
      ...data,
      email: event.target.value,
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
          <p hidden>
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>

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
        <div className="divErrorSubcriptions">
          <p>
            {t("subscribe.error")}{" "}
            <a href="/contact">{t("subscribe.error2")}</a>.
          </p>
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
