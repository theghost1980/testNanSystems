import React from 'react';
//components
import Layout from '../components/layout';
//emailjs
import _emailJs from 'emailjs-com';
//media-imgs
import iconSystem from '../media-imgs/test-logo-system.png';

//declarations emailjs
const userId = "user_eI2TfwSXCTylXcY4axXJe";
const serviceId = "nansystems.us";
const templateId = "template_a4weyh4";

class Contact extends React.Component{
    constructor(props) {
      super(props);
      this.state = { feedback: '', name: '', email: '', sent: false , sending: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.messageSentSuccess = this.messageSentSuccess.bind(this);
    }

    render(){
        return (
            <Layout>
                <div className="contactContainer">
                    {/* <Head title={this.props.t('contact.titlePage')}/> */}
                    <div className="formContainer">
                        <form className="contactForm" onSubmit={this.handleSubmit}>
                            <div className="rowCont">
                                <div className="labelsCont">
                                    <p className="lblForm">Name</p>
                                    <p className="lblForm">Email</p>
                                    <p className="lblForm">Feedback</p>
                                </div>
                                <div className="inputsCont">
                                    <input 
                                        id="test-text"
                                        name="test-text"
                                        onChange={this.handleChangeText}
                                        placeholder="name here please"
                                        required
                                        value={this.state.name}
                                        className="inputForm"
                                        disabled={this.state.sending}
                                    />
                                    <input 
                                        id="test-email"
                                        name="test-email"
                                        onChange={this.handleChangeEmail}
                                        placeholder="email here please"
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
                                        placeholder="feedback or comments here please"
                                        required
                                        value={this.state.feedback}
                                        className="inputForm"
                                        disabled={this.state.sending}
                                        />
                                </div>
                            </div>
                            <div className="btnCont">
                                {
                                    !this.state.sending && !this.state.sent &&
                                        <div className="btnRowCont">
                                            <input type="submit" value="Submit" className="btnForm" />
                                            <input type="button" value="Cancel" className="btnForm" onClick={this.resetForm} />
                                        </div>
                                }
                                {
                                    this.state.sending &&
                                        <div className="sendingEmailCont">
                                            {/* Sending Email...(I am so animated right?) */}
                                            <div>
                                                <p className="sendingText">Sending Email. Please Wait!</p>
                                            </div>
                                            <div className="imgSendingCont">
                                                <img src={iconSystem} alt="sending email" className="iconSending" />
                                            </div>
                                        </div>
                                }
                                { 
                                    this.state.sent && 
                                        <div className="sendingEmailCont">
                                            <p className="sendingText">Email Sent!<br></br>Thank you. I will replay as soon as possible.</p>
                                            {/* <img src={iconSent} alt="Message Delivered" className="iconSent" /> */}
                                        </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
    //handling functions and emailjs send functions and handlers
    handleChangeText(event) {
        this.setState({name: event.target.value})
    }
    handleChangeEmail(event) {
        this.setState({email: event.target.value})
    }
    handleChange(event) {
        this.setState({feedback: event.target.value})
    }
    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            feedback: '',
            sent: false
        })
    }
    sendingMessage() {
        this.setState(
            { sending: true }
        );
    }
    messageSentSuccess() {
        this.setState({ sending:false });
        this.setState({sent: true});
        setTimeout(this.resetForm,4000);
    }
            
    handleSubmit (event) {
        this.sendingMessage();
        this.sendFeedback({message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
        event.preventDefault();
    }
            
    sendFeedback (variables) { 
        _emailJs.init(userId);
        _emailJs.send(
        serviceId, templateId,
        variables
        ).then(res => {
            console.log('Email successfully sent!');
            this.messageSentSuccess();
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
}

export default Contact;

// contact template
// import React from 'react';
// import _emailJs from 'emailjs-com';
// //components
// import Head from '../components/Head';
// //media-imgs
// import iconSent from '../imgMedia/icons8-envelope-64.png';
// import iconFb from '../imgMedia/icons8-facebook-64.png';
// import iconGH from '../imgMedia/icons8-github-64.png';
// import iconLD from '../imgMedia/icons8-linkedin-circled-64.png';
// // translations
// import { withTranslation } from 'react-i18next';

// const userId = "user_U5jGLkv3g6gljGYHt5us6";
// const serviceId = "infosteemitvenezuela";
// const templateId = "template_0x1c7h8";
// // const templateId = "template_mrkvjq9";

// class Contact extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { feedback: '', name: '', email: '', sent: false };
//       this.handleChange = this.handleChange.bind(this);
//       this.handleChangeEmail = this.handleChangeEmail.bind(this);
//       this.handleChangeText = this.handleChangeText.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//       this.resetForm = this.resetForm.bind(this);
//       this.messageSentSuccess = this.messageSentSuccess.bind(this);
//     }

//     render() {
    
//       return (
//         <div className="contactContainer">
//           <Head title={this.props.t('contact.titlePage')}/>
//         <div className="wMarginCont">
//         <p className="titleContact">{this.props.t('contact.titleContact')}</p>
//         <div className="formContainer">
//             <form className="contactForm" onSubmit={this.handleSubmit}>
//                 <div className="rowCont">
//                  <div className="labelsCont">
//                     <p className="lblForm">{this.props.t('contact.name')}</p>
//                     <p className="lblForm">{this.props.t('contact.email')}</p>
//                     <p className="lblForm">{this.props.t('contact.comments')}</p>
//                  </div>
//                  <div className="inputsCont">
//                   <input 
//                     id="test-text"
//                     name="test-text"
//                     onChange={this.handleChangeText}
//                     placeholder={this.props.t('contact.phName')}
//                     required
//                     value={this.state.name}
//                     className="inputForm"
//                   />
//                   <input 
//                     id="test-email"
//                     name="test-email"
//                     onChange={this.handleChangeEmail}
//                     placeholder={this.props.t('contact.phEmail')}
//                     type="email"
//                     required
//                     value={this.state.email}
//                     className="inputForm"
//                   />
//                   <textarea
//                     id="test-mailing"
//                     name="test-mailing"
//                     onChange={this.handleChange}
//                     placeholder={this.props.t('contact.phFeedback')}
//                     required
//                     value={this.state.feedback}
//                     className="inputForm"
//                     />
//                  </div>
//                 </div>
//                 <div className="btnCont">
//                     <input type="submit" value={this.props.t('contact.submitValue')} className="btnForm" />
//                     <input type="button" value={this.props.t('contact.cancelValue')} className="btnForm" onClick={this.resetForm} />
//                 </div>
//             </form>
//             { this.state.sent && 
//                     <div className="emailSentCont">
//                         <p className="pEmailSent">{this.props.t('contact.emailSent')}</p>
//                         <img src={iconSent} alt="Message Delivered" className="iconSent" />
//                     </div>
//             }
//         </div>
//         <ul className="ulMediaIcons">
//             <li>
//                 <a href="https://www.facebook.com/saturno.mangieri/">
//                     <img src={iconFb} alt="Facebook Profile" className="iconsSocial" />
//                 </a>
//             </li>
//             <li>
//                 <a href="https://github.com/theghost1980">
//                     <img src={iconGH} alt="GitHub Profile" className="iconsSocial" />
//                 </a>
//             </li>
//             <li>
//                 <a href="https://www.linkedin.com/in/saturno-mangieri-011265138/">
//                     <img src={iconLD} alt="Linkedin Profile" className="iconsSocial" />
//                 </a>
//             </li>
//         </ul>
//         </div>
//         </div>
//       )
//     }
//     handleChangeText(event) {
//         this.setState({name: event.target.value})
//       }
//       handleChangeEmail(event) {
//         this.setState({email: event.target.value})
//       }
//       handleChange(event) {
//         this.setState({feedback: event.target.value})
//       }
//       resetForm = () => {
//         this.setState({
//             name: '',
//             email: '',
//             feedback: '',
//             sent: false
//         })
//       }
//       messageSentSuccess() {
//           this.setState({sent: true});
//           setTimeout(this.resetForm,4000);
//       }
    
//       handleSubmit (event) {
//         this.sendFeedback({message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
//         event.preventDefault();
//       }
    
//       sendFeedback (variables) { 
//         _emailJs.init(userId);
//         _emailJs.send(
//           serviceId, templateId,
//           variables
//           ).then(res => {
//             console.log('Email successfully sent!');
//             this.messageSentSuccess();
//           })
//           // Handle errors here however you like, or use a React error boundary
//           .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
//     }
// }

// export default withTranslation()(Contact);
// end contact template