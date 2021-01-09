import React, { useState, useEffect, useRef } from 'react';

//mailing system
import emailJs from 'emailjs-com';
//translations
import { useTranslation } from "react-i18next";
//media-imgs
import robotImg from '../media-imgs/robot.png';
import bottomImg from '../media-imgs/lineBG.png';

//declarations emailjs
const userId = "user_eI2TfwSXCTylXcY4axXJe";
const serviceId = "nansystems.us";
const templateId = "simple_quote21";

const QuickQuote = (props) => {
    const refForm = useRef(null);

    const { t, i18n } = useTranslation();
    // const _lang = i18n.language;

    const [optionState, setOptionState] = useState('Not Set');

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const _titleQuote = props.quote;
    const _dateTime = new Date();
    const [companyUser, setcompanyUser] = useState(true); //company user as true for default
    // const initialValue = {
    //     quote: _titleQuote,
    //     companyUser: user, //bydefault false
    //     name: 'Charles Bronson',
    //     email: 'charles.bronson@gmail.com',
    //     phone: '(+1)555-555-555',
    //     comments: 'Ipsem Lorem I Will rock your world and revenge the good people of this world',
    //     company: 'Deadly Fists LLC.',
    //     job: 'Operation Manager',
    //     callme: 'Business Hours',
    //     dateTime: _dateTime
    // };
    const [data, setData] = useState({
        quote: String(_titleQuote),
        companyUser: companyUser, //bydefault
        name: "Charles Bronson",
        email: "charles.bronson@gmail.com",
        phone: "(+1)555-555-555",
        comments: "Ipsem Lorem I Will rock your world and revenge the good people of this world",
        company: "Deadly Fists LLC.",
        job: "Operation Manager",
        callme: "Business Hours",
        dateTime: String(_dateTime)
    });
    // console.log(data);

    const handleChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        const { name, value } = e.target;
        if (name === "companyUser"){
            setcompanyUser(!companyUser);
            setData( prevState => ({
                ...prevState,
                [name] : String(e.target.checked)
            }));
        } else {
            setData( prevState => ({
                ...prevState,
                [name] : String(value)
            }))
        }
        // console.log(data);
    }

    const handleSelectChange = (e) => {
        // console.log(`I'm changing to:${e.target.value}`);
        setOptionState(e.target.value);
        handleChange(e);
    }

    const resetForm = () => {
        setData({
            quote: String(_titleQuote),
            companyUser: companyUser, //bydefault
            name: "Charles Bronson",
            email: "charles.bronson@gmail.com",
            phone: "(+1)555-555-555",
            comments: "Ipsem Lorem I Will rock your world and revenge the good people of this world",
            company: "Deadly Fists LLC.",
            job: "Operation Manager",
            callme: "Business Hours",
            dateTime: String(_dateTime)
        });
        refForm.current.reset();
    }

    function clearAll(){
        setSending(false);
        setSent(false);
    }

    function handleSubmit (event) {
        event.preventDefault();
        setSending(true);

        // testing code from emailjs docs
            // e.preventDefault();
            // console.log(event.target);
            // console.log(data);

            // emailJs.sendForm(serviceId, templateId, event.target, userId)
            // emailJs.sendForm(serviceId, templateId, event.target, userId,
            //     {
            //         comments_from: `${data.comments}`, 
            //         from_name: `${data.name}`, 
            //         reply_to: `${data.email}`, 
            //         quote_from: `${data.quote}`,
            //         companyUser_from: `${companyUser ? 'It was a company User': 'It was a home user'}`,
            //         company_from: `${data.company}`,
            //         job_from: `${data.job}`,
            //         name_from: "Using double Quotes",
            //         email_from: "Using double Quotes",
            //         phone_from: "Using double Quotes",
            //         callme_from: "Using double Quotes",
            //         dateTime_from: `${_dateTime}`
        
            //     }    
            // )
            //   .then((result) => {
            //       console.log(result.text);
            //   }, (error) => {
            //       console.log(error.text);
            //   });
        // end testing

        //convert data to html format
        // const _str = data.forEach(item => item +)
       // transform data into array
    //    const _array = [];
    //    const _array2 = [];
    //    for (const property in data) {
    //        _array.push(`${property}:${data[property]}`);
    //        _array2.push(`${property}:${data[property]}`);
    //    }
    //    console.log(_array);
    //    const _chainData = _array.join(" <br> ");
    //    const _chainData2 = _array2.join(" <br> ");
    //    console.log(_chainData);
    // quote: _titleQuote,
    // companyUser: true, //bydefault
    // name: 'Charles Bronson',
    // email: 'charles.bronson@gmail.com',
    // phone: '(+1)555-555-555',
    // comments: 'Ipsem Lorem I Will rock your world and revenge the good people of this world',
    // company: 'Deadly Fists LLC.',
    // job: 'Operation Manager',
    // callme: 'Business Hours',
    // dateTime: _dateTime
        sendFeedback({
            reply_to: data.email, 
            quote: data.quote,
            companyUser: `${companyUser ? "It was a company User": "t was a home user"}`,
            company: data.company,
            job: data.job,
            name: data.name,
            email: data.email,
            phone: data.phone,
            callme: data.callme,
            dateTime: data.dateTime,
            comments: data.comments, 

        })
       
    }

    function messageSentSuccess() {
        resetForm();
        setSent(true);
        setTimeout(clearAll, 5500);
    }

    function sendFeedback(variables) { 
        emailJs.init(userId);
        emailJs.send(
        serviceId, templateId,
        variables
        ).then(res => {
            console.log('Email successfully sent!');
            messageSentSuccess();
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    
    // useEffect(() => {
    //     console.log(data);
    // },[data]);

    return (
        // open &&  
            <div className="quoteCont">
                <h1 className="titleItemVenture">{_titleQuote}</h1>
                    <label className="lbl-checkBoxQuote boldLblInputs">{t('quickquote.companyUser')}{" "}
                    <input 
                        type="checkbox" 
                        name="companyUser" 
                        onChange={handleChange} 
                        checked={companyUser} 
                        disabled={sending}
                    />
                </label>
                <form onSubmit={handleSubmit} ref={refForm} className="formQuote" id="form-Quote">
                    <div className="rowCont">
                        <div className="labelsCont">
                            <p className="lblFormQuote boldLblInputs">{t('quickquote.name')}</p>
                            <p className="lblFormQuote boldLblInputs">{t('quickquote.phone')}</p>
                            <p className="lblFormQuote boldLblInputs">{t('quickquote.callme')}</p>
                            <span className={`labelSpan ${companyUser ? null : 'hideLabels' }`}>
                                <p className="lblFormQuote boldLblInputs">{t('quickquote.company')}</p>
                                <p className="lblFormQuote boldLblInputs">{t('quickquote.job')}</p>
                            </span>
                            <p className="lblFormQuote boldLblInputs">{t('quickquote.email')}</p>
                            <p className="lblFormQuote boldLblInputs">{t('quickquote.comments')}</p>
                        </div>
                        <div className="inputsCont">
                            <input 
                                id="test-name"
                                name="name"
                                onChange={handleChange}
                                placeholder={t('quickquote.nameh')}
                                required
                                // value={this.state.name}
                                className="inputForm boldLblInputs"
                                disabled={sending}
                            />
                            <input 
                                id="test-phone"
                                name="phone"
                                onChange={handleChange}
                                placeholder={t('quickquote.phoneh')}
                                // value={this.state.name}
                                className="inputForm boldLblInputs"
                                disabled={sending}
                            />
                            <select 
                                id="test-callme"
                                name="callme"
                                // value={optionState}
                                onChange={handleSelectChange}
                                // placeholder={t('quickquote.call')}
                                // value={this.state.name}
                                className="inputForm boldLblInputs"
                                disabled={sending}
                                form="form-Quote"
                                // value={t('quickquote.call')}
                            >
                                <option value="" disabled selected>{t('quickquote.call')}</option>
                                <option value={t('quickquote.callB')}>{t('quickquote.callB')}</option>
                                <option value={t('quickquote.callA')}>{t('quickquote.callA')}</option>
                                <option value={t('quickquote.iwill')}>{t('quickquote.iwill')}</option>
                            </select>
                            <span className={`inputSpan ${companyUser ? null : 'hideInputSpans' }`}>
                                <input 
                                    id="test-company"
                                    name="company"
                                    onChange={handleChange}
                                    placeholder={t('quickquote.companyh')}
                                    required={companyUser}
                                    // value={this.state.name}
                                    className="inputForm boldLblInputs"
                                    disabled={sending}
                                />
                                <input 
                                    id="test-job"
                                    name="job"
                                    onChange={handleChange}
                                    placeholder={t('quickquote.jobth')}
                                    required={companyUser}
                                    // value={this.state.name}
                                    className="inputForm boldLblInputs"
                                    disabled={sending}
                                />
                            </span>
                            <input 
                                id="test-email"
                                name="email"
                                onChange={handleChange}
                                placeholder={t('quickquote.emailh')}
                                type="email"
                                required
                                // value={this.state.email}
                                className="inputForm boldLblInputs"
                                disabled={sending}
                            />
                            <textarea
                                id="test-mailing"
                                name="comments"
                                onChange={handleChange}
                                placeholder={t('quickquote.commentsh')}
                                required
                                // value={this.state.feedback}
                                className="inputForm boldLblInputs"
                                disabled={sending}
                                />
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="btnCont">
                        {
                            // !this.state.sending && !this.state.sent &&
                              !sending &&  
                                <div className="btnRowCont" >
                                        <input type="submit" value={t('quickquote.send')} className="btnForm" />
                                        <input type="reset" value={t('quickquote.cancel')}  className="btnForm" onClick={resetForm} />
                                </div>
                        }
                        {
                            sending && !sent &&
                                <div className="divFloatMessageQuote">
                                    <p className="titleItemVenture biggerText">{t('quickquote.sending')}</p>
                                    <p className="titleItemVenture biggerText">{t('quickquote.ourobots')}</p>
                                    <img src={robotImg} alt="working for you" className="robotQuote" />
                                </div>
                        }
                        {
                            sent && 
                                <div className="divFloatMessageQuote">
                                    <p className="titleItemVenture biggerText">{t('quickquote.sent')}</p>
                                    <p className="titleItemVenture biggerText">{t('quickquote.wewill')}</p>
                                    <div className="fancyDivSepCont">
                                        <img src={bottomImg} alt="fancy Line Sep" className="imgLineSep" />
                                    </div>
                                </div>
                        }
                    </div>
                </form>
            </div>
    )
}

export default QuickQuote;