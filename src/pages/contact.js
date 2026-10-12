import React from "react";
import Layout from "../components/layout";
import iconSystem from "../media-imgs/test-logo-system.png";
import { withTranslation } from "react-i18next";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";
import ContactErrorText from "../components/contactErrorText";
import { submitNetlifyForm } from "../utils/netlifyForm";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      name: "",
      email: "",
      sent: false,
      sending: false,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.messageSentSuccess = this.messageSentSuccess.bind(this);
  }

  render() {
    const _lang = this.props.i18n.language;
    const dataSEO =
      _lang === "es" ? this.props.data.dataSEO_es : this.props.data.dataSEO_en;

    return (
      <Layout>
        <HelmetDatoCms seo={dataSEO.seoMetaTags} />
        <div className="contactContainer">
          <div className="formContainer">
            <form className="contactForm" onSubmit={this.handleSubmit}>
              <div className="rowCont">
                <div className="labelsCont">
                  <p className="lblForm">{this.props.t("contact.name")}</p>
                  <p className="lblForm">{this.props.t("contact.email")}</p>
                  <p className="lblForm">{this.props.t("contact.feedback")}</p>
                </div>
                <div className="inputsCont">
                  <input
                    id="test-text"
                    name="test-text"
                    onChange={this.handleChangeText}
                    placeholder={this.props.t("contact.inputName")}
                    required
                    value={this.state.name}
                    className="inputForm"
                    disabled={this.state.sending}
                  />
                  <input
                    id="test-email"
                    name="test-email"
                    onChange={this.handleChangeEmail}
                    placeholder={this.props.t("contact.inputEmail")}
                    type="email"
                    required
                    value={this.state.email}
                    className="inputForm"
                    disabled={this.state.sending}
                  />
                  <textarea
                    id="test-mailing"
                    name="test-mailing"
                    onChange={this.handleChange}
                    placeholder={this.props.t("contact.inputFeedback")}
                    required
                    value={this.state.feedback}
                    className="inputForm"
                    disabled={this.state.sending}
                  />
                </div>
              </div>
              <div className="btnCont">
                {this.state.error && !this.state.sending && (
                  <div className="sendingEmailCont">
                    <p className="divErrorSubcriptions" role="alert">
                      {this.props.t("contact.errorTitle")}
                      <br></br>
                      <ContactErrorText i18nKey="contact.errorText" />
                    </p>
                  </div>
                )}
                {!this.state.sending && !this.state.sent && (
                  <div className="btnRowCont">
                    <input
                      type="submit"
                      value={this.props.t("contact.submit")}
                      className="btnForm"
                    />
                    <input
                      type="button"
                      value={this.props.t("contact.cancel")}
                      className="btnForm"
                      onClick={this.resetForm}
                    />
                  </div>
                )}
                {this.state.sending && (
                  <div className="sendingEmailCont">
                    <div>
                      <p className="sendingText">
                        {this.props.t("contact.sending")}
                      </p>
                    </div>
                    <div className="imgSendingCont">
                      <img
                        src={iconSystem}
                        alt="sending email"
                        className="iconSending"
                      />
                    </div>
                  </div>
                )}
                {this.state.sent && (
                  <div className="sendingEmailCont">
                    <p className="sendingText">
                      {this.props.t("contact.sentOne")}
                      <br></br>
                      {this.props.t("contact.sentTwo")}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
  handleChangeText(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChange(event) {
    this.setState({ feedback: event.target.value });
  }
  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      feedback: "",
      sent: false,
      error: false,
    });
  };
  sendingMessage() {
    this.setState({ sending: true, error: false });
  }
  messageSentSuccess() {
    this.setState({ sending: false });
    this.setState({ sent: true });
    setTimeout(this.resetForm, 4000);
  }

  handleSubmit(event) {
    this.sendingMessage();
    this.sendFeedback({
      name: this.state.name,
      email: this.state.email,
      message: this.state.feedback,
    });
    event.preventDefault();
  }

  sendFeedback(fields) {
    submitNetlifyForm("contact", fields)
      .then(() => {
        this.messageSentSuccess();
      })
      .catch((err) => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err,
        );
        // Antes la pantalla se quedaba en "Enviando…" para siempre.
        this.setState({ sending: false, error: true });
      });
  }
}

export default withTranslation()(Contact);

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
