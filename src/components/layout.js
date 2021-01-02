import React from 'react';
//components
import Header from './header';
import Footer from './footer';
//cookies consent
import CookieConsent from 'react-cookie-consent';
// translations
import PropTypes from 'prop-types';
import { withTrans } from '../i18n/withTrans';

const Layout = ({ children, t, i18n }) => {
    return (
        <div className="layoutContainer">
            <div className="content">
                <Header />
                <div className="dataContainer">
                    {children}
                </div>
            </div>
            {/* cookies consent */}
            <div className="cookiesConsentCont">
                <CookieConsent
                    location="bottom"
                    buttonText="I Understand"
                    declineButtonText="Decline"
                    cookieName="gatsby-gdpr-google-analytics"
                    onAccept={() => {
                        console.log("Accept was triggered by clicking the Accept button");
                    }}
                    buttonStyle={{ 
                        color: "#4e503b", 
                        fontSize: "15px",
                        fontFamily: "var(--var-font-subtitles)",
                        fontWeight: "bold"  
                    }}
                >
                        This website uses cookies to enhance the user experience.<br></br>
                        <span style={{ fontSize: "10px" }}>The NaNSYSTEMS robots are working to make the world a better place.</span>
                </CookieConsent>
            </div>
            {/* end cookies consent */}
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout);