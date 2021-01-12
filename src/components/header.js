import React, { useEffect, useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
//components
import Selector from '../components/selector';
//translations
import { useTranslation } from "react-i18next";

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);

    //translations
    const { t } = useTranslation();

    function checkWidth(){
        const _screenWidth = window.innerWidth;
        console.log(`Actual Width:${_screenWidth}`);
        if (_screenWidth <= 885){
            setMobileMenu(true);
        } else {
            setMobileMenu(false);
        }
    }

    const handleResize = () => {
        checkWidth();
    }
    useEffect(() => {
        checkWidth();
    },[]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [handleResize]);

    //test to improve coding
    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         const _screenWidth = window.innerWidth;
    //         // console.log(`Actual Width:${_screenWidth}`);
    //         if (_screenWidth <= 885){
    //             setMobileMenu(true);
    //         } else {
    //             setMobileMenu(false);
    //         }
    //     });

    //     return () => {
    //         window.removeEventListener('resize', () => {
    //         const _screenWidth = window.innerWidth;
    //         // console.log(`Actual Width:${_screenWidth}`);
    //         if (_screenWidth <= 885){
    //             setMobileMenu(true);
    //         } else {
    //             setMobileMenu(false);
    //         }
    //         });
    //     }
    // }, []);
    //end test

    return (
        <StaticQuery
        query={graphql`
          query {
            datoCmsInfoSite {
                id
                logoSite {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
                logoSiteWhite {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
                logoSiteSquare{
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
            }
          }
        `}
        render={data => (
            <div className="whiteBG">
            <header>
                <nav>
                    <div className="navBlock">
                        <ul className={mobileMenu ? 'hide': 'navItemsUL'}>
                            <li className="navItem">
                                <Link to="/" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.home')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/about" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.about')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/portfolio" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.portfolio')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/blog" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.blog')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/ventures" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.ventures')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/contact" className="navLink" activeClassName="activeNavLink">
                                    {t('menu.contact')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Selector />
                            </li>
                        </ul>
                        {
                            mobileMenu &&
                                <div className="burguerMenuCont" onClick={() => setClickedMenu(!clickedMenu)}>
                                    <svg viewBox="0 0 100 80" width="40" height="40">
                                        <rect className="rectHamItem" width="100" height="20"></rect>
                                        <rect className="rectHamItem" y="30" width="100" height="20"></rect>
                                        <rect className="rectHamItem" y="60" width="100" height="20"></rect>
                                    </svg>
                                </div>
                        }
                        {
                            clickedMenu && 
                                <div className="flyerMobileMenu">
                                    <div className="mobileMenuSqrImgBgCont">
                                        <Img fluid={data.datoCmsInfoSite.logoSiteSquare.fluid} className="bgImgBg" />
                                    </div>
                                    <ul className="mobileMenuUL">
                                        <li className="navItemMobile">
                                            <Link to="/" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.home')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/about" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.about')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/portfolio" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.portfolio')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/blog" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.blog')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/ventures" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.ventures')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/contact" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.contact')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Selector classMobile="mobileSelector"/>
                                        </li>
                                        <li className="navItemMobile">
                                            <div className="closeBtnCont" onClick={() => setClickedMenu(!clickedMenu)}>
                                                {t('menu.close')}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                        }
                        <Link to="/" activeClassName="activeNavLink">
                            <div className="logoCont">
                                <Img fluid={data.datoCmsInfoSite.logoSite.fluid} className="logoImg"/>
                            </div>
                        </Link>
                    </div>
                </nav>
            </header>
            </div>
        )}
      />
    )
}

export default Header;