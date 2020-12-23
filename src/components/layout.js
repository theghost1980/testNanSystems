import React from 'react';
//components
import Header from './header';
import Footer from './footer';
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
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout);