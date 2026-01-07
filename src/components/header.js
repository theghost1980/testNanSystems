import React, { useEffect, useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
//components
import Selector from '../components/selector';
//translations
import { useTranslation } from "react-i18next";

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [fixedBar, setFixedBar] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);

    //translations
    const { t } = useTranslation();

    function checkWidth(){
        const _screenWidth = window.innerWidth;
        if (_screenWidth <= 946){
            setMobileMenu(true);
        } else {
            setMobileMenu(false);
        }
    }

    function checkScroll(){
        const _scrollPosition = window.scrollY;
        setFixedBar(_scrollPosition >= 97 ? true : false );
    }

    const handleResize = () => {
        checkWidth();
    }
    useEffect(() => {
        checkWidth();
    },[]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', checkScroll);
        }
    }, [handleResize]);

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
                    <div className={`navBlock ${fixedBar ? 'fixedNavBlock shadowBottom' : null }`}>
                        <Link to="/" className={`${fixedBar ? 'justMarginLeft': null}`} activeClassName="activeNavLink" aria-label={t('menu.ariaHome')}>
                            <div className="logoCont" aria-label={t('menu.ariaLogo')}>
                                <Img fluid={data.datoCmsInfoSite.logoSite.fluid} className="logoImg"/>
                            </div>
                        </Link>
                        <ul className={`${mobileMenu ? 'hide': 'navItemsUL'} marginLeft`}>
                            <li className="navItem">
                                <Link to="/" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaHome')}
                                >
                                    {t('menu.home')}
                                </Link>
                            </li>
                            <li className="navItem">
                                {/* oldOne /about newOne aboutNew */}
                                <Link to="/aboutNew" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaAbout')}
                                >
                                    {t('menu.about')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/portfolio" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaPortfolio')}
                                >
                                    {t('menu.portfolio')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/blog" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaBlog')}
                                >
                                    {t('menu.blog')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/ventures" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaVentures')}
                                >
                                    {t('menu.ventures')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/contact" className="navLink" activeClassName="activeNavLink"
                                    aria-label={t('menu.ariaContact')}
                                >
                                    {t('menu.contact')}
                                </Link>
                            </li>
                            <li className="navItem">
                                <Selector aria-label={t('menu.ariaLanguage')} />
                            </li>
                        </ul>
                        {
                            mobileMenu &&
                                <div className="burguerMenuCont" onClick={() => setClickedMenu(!clickedMenu)}
                                    aria-label={t('menu.ariaHam')}
                                >
                                    <svg viewBox="0 0 100 80" width="40" height="40" className="svgHam">
                                        <rect className="rectHamItem" width="100" height="20"></rect>
                                        <rect className="rectHamItem" y="30" width="100" height="20"></rect>
                                        <rect className="rectHamItem" y="60" width="100" height="20"></rect>
                                    </svg>
                                </div>
                        }
                        {
                            clickedMenu && 
                                <div className="flyerMobileMenu">
                                    <div className="mobileMenuSqrImgBgCont"
                                        aria-label={t('menu.ariaLogo')}
                                    >
                                        <Img fluid={data.datoCmsInfoSite.logoSiteSquare.fluid} className="bgImgBg" />
                                    </div>
                                    <ul className="mobileMenuUL">
                                        <li className="navItemMobile">
                                            <Link to="/" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaHome')}
                                            >
                                                {t('menu.home')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            {/* oldOne /about newOne /aboutNew */}
                                            <Link to="/aboutNew" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaAbout')}
                                            >
                                                {t('menu.about')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/portfolio" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaPortfolio')}
                                            >
                                                {t('menu.portfolio')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/blog" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaBlog')}
                                            >
                                                {t('menu.blog')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/ventures" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaVentures')}
                                            >
                                                {t('menu.ventures')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/contact" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaContact')}
                                            >
                                                {t('menu.contact')}
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Selector classMobile="mobileSelector" aria-label={t('menu.ariaLanguage')} />
                                        </li>
                                        <li className="navItemMobile">
                                            <div className="closeBtnCont" onClick={() => setClickedMenu(!clickedMenu)}
                                                aria-label={t('menu.ariaClose')} 
                                            >
                                                {t('menu.close')}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </nav>
            </header>
            </div>
        )}
      />
    )
}

export default Header;