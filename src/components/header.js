import React, { useEffect, useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [clickedMenu, setClickedMenu] = useState(false);

    function checkWidth(){
        const _screenWidth = window.innerWidth;
        console.log(`Actual Width:${_screenWidth}`);
        if (_screenWidth <= 844){
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
            <header>
                <nav>
                    <div className="navBlock">
                        <Link to="/" activeClassName="activeNavLink">
                            <div className="logoCont">
                                <Img fluid={data.datoCmsInfoSite.logoSiteWhite.fluid} className="logoImg"/>
                            </div>
                        </Link>
                        <ul className={mobileMenu ? 'hide': 'navItemsUL'}>
                            <li className="navItem">
                                <Link to="/" className="navLink" activeClassName="activeNavLink">
                                    Home
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/about" className="navLink" activeClassName="activeNavLink">
                                    About
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/portfolio" className="navLink" activeClassName="activeNavLink">
                                    Portfolio
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/blog" className="navLink" activeClassName="activeNavLink">
                                    Blog
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/ventures" className="navLink" activeClassName="activeNavLink">
                                    Ventures
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link to="/contact" className="navLink" activeClassName="activeNavLink">
                                    Contact
                                </Link>
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
                                    <ul className="mobileMenuUL">
                                        <li className="navItemMobile">
                                            <Link to="/" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/about" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                About
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/portfolio" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                Portfolio
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/blog" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                Blog
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/ventures" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                Ventures
                                            </Link>
                                        </li>
                                        <li className="navItemMobile">
                                            <Link to="/contact" className="navLinkMobile" onClick={() => setClickedMenu(!clickedMenu)}>
                                                Contact
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="mobileMenuSqrImgBgCont">
                                        <Img fluid={data.datoCmsInfoSite.logoSiteSquare.fluid} className="bgImgBg" />
                                    </div>
                                    <div className="closeBtnCont" onClick={() => setClickedMenu(!clickedMenu)}>
                                        CLOSE
                                    </div>
                                </div>
                        }
                    </div>
                </nav>
            </header>
        )}
      />
    )
}

export default Header;