import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
//media-imgs
import imgSubcription from '../media-imgs/dummy300x300-subscriptions.png';
//components
//confetty lib
// tested party-js and render on z-index 0
// testing now npm install react-confetti
import ConfettiAnimation from './confettiAnimation';


//translations
import { useTranslation } from "react-i18next";
import { Link } from 'gatsby';


const Mailchimpform = (props) => {
    // const _show = props.show || false;
    const { closeCB } = props;
    const { t } = useTranslation();
    const [data, setData] = useState({
        email: "",
        result: {
            result: "empty",
            msg: ""
        }
    });
    // console.log("Initialization");
    // console.log(data);

    const _handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addToMailchimp(data.email);
        setData({
            result: result 
        });
        console.log('Result');
        console.log(result);
    }

    const _handleChange = event => {
        setData({
            email: event.target.value,
            result: data.result
        });
    }

    // const element = document.createElement('canvas');
    // element.style.zIndex='100000';
    // element.style.background='black';
    // document.getElementById("confettyDiv").appendChild(element);

    // function confettyRain() {
    //     // let siteColors = ['#ffa68d', '#fd3a84'];
    //     // const _element = document.getElementById("confettyDiv");
    //     // // _element.style.zIndex = "100000";
    //     // // document.getElementById("confettyDiv")
    //     // _element.addEventListener('click', function (e) {
    //     // e.preventDefault();
    //     //     party.screen({
    //     //         color: siteColors,
    //     //         size: party.minmax(6, 12),
    //     //         count: party.variation(300 * (window.innerWidth / 1980), 0.4),
    //     //         angle: -180,
    //     //         spread: 80,
    //     //         angularVelocity: party.minmax(6, 9)
    //     //     });
    //     // });
    //     party.screen();
    // }

    return (
            data.result.result === "empty" ? (
                <div className="coloredScreenBGFixed relativeDiv">
                    <div className="subcriptionCont" id="confettyDiv">
                        <img src={imgSubcription} alt="subscribe to NaNSYSTEMS NewsLetter" className="imgSubscriptions" />
                        <form onSubmit={_handleSubmit} className="formSubcription">
                            <input 
                                type="email" 
                                name="email" 
                                onChange={_handleChange} 
                                required 
                                // value={data.email}
                                // disabled={data.sending}
                                className="inputMailChimp"
                                placeholder={t('subscribe.emailhere')}
                            />
                            <br />
                            <button name="btnSubscribe" className="btnSubscribe xtraSubscribeBtn" type="submit">{t('subscribe.getme')}</button>
                            {/* <div id="my-button" style={{ zIndex: '20'}} onClick={() => party.screen()}>
                                Click me!
                            </div> */}
                        </form>
                        <div className="btnSubscribeMini positionAbs1 " onClick={() => closeCB()}>
                            Close
                        </div>
                    </div>
                </div>
            ) :
            data.result.result === "success" ? (
                <div className="coloredScreenBGFixed">
                    <ConfettiAnimation />
                    <div className="subcriptionCont">
                        <img src={imgSubcription} alt="subscribe to NaNSYSTEMS NewsLetter" className="imgSubscriptions" />
                        <div className="divErrorSubcriptions"
                            dangerouslySetInnerHTML={{
                                __html: data.result.msg + `<p>${t('subscribe.thanks')}</p>`
                            }}
                        />
                    </div>
                </div>
            ) : ( //we have an error or another thing comming from result.result
                <div className="coloredScreenBGFixed">
                    <div className="subcriptionCont">
                        <img src={imgSubcription} alt="subscribe to NaNSYSTEMS NewsLetter" className="imgSubscriptions" />
                        <div className="divErrorSubcriptions"
                            dangerouslySetInnerHTML={{
                                __html: data.result.msg + `. ${t('subscribe.error')} ` + `<a href="/contact">${t('subscribe.error2')}</a>.`
                            }}
                        />
                    </div>
                </div>
            ) 
    )
}

export default Mailchimpform;