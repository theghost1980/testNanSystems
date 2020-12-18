import React from 'react';
//components
import Header from './header';
import Footer from './footer';

const Layout = (props) => {
    return (
        <div className="layoutContainer">
            <div className="content">
                <Header />
                <div className="dataContainer">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;