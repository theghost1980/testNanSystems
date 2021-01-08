import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
//media-imgs
import heartIcon from '../media-imgs/heart.png';
//components
// import Selector from '../components/selector';
//translations
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation();
    const _lang = i18n.language;

    return (
            <StaticQuery
                query={graphql`
                query {
                    allDatoCmsSocialProfile(filter: {locale: {eq: "en"}}) {
                        edges {
                            node {
                                id
                                profileType
                                url
                                seoMetaTags {
                                    ...GatsbyDatoCmsSeoMetaTags
                                }
                                darkIcon {
                                    fluid {
                                        ...GatsbyDatoCmsFluid
                                    }
                                }
                                lightIcon {
                                    fluid {
                                        ...GatsbyDatoCmsFluid
                                    }
                                }
                            }
                        }
                    }
                    datoCmsInfoSite {
                        id
                        logoSite {
                            fluid {
                                ...GatsbyDatoCmsFluid
                            }
                        }
                        logoSiteWhite{
                            fluid {
                                ...GatsbyDatoCmsFluid
                            }
                        }
                    }
                    dataServices_en:   allDatoCmsTechnology(filter: {locale: {eq: "en"}}) {
                        edges {
                            node {
                                id
                                shortTitle
                                slug
                            }
                        }
                    }
                    dataServices_es:   allDatoCmsTechnology(filter: {locale: {eq: "es"}}) {
                        edges {
                            node {
                                id
                                shortTitle
                                slug
                            }
                        }
                    }
                }`}

            render={data => (
                <footer>
                    <div className="rowFooter">
                        <div className="leftCont40">
                            <ul className="socialULfooter">
                                {
                                    data.allDatoCmsSocialProfile.edges.map(item => {
                                        return (
                                            <li key={item.node.id}>
                                                <a href={item.node.url}>
                                                    <Img fluid={item.node.lightIcon.fluid} className="socialIcon" />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {/* <p className="subtitleFooter">{t('footer.contactme')}</p> */}
                            {/* <Selector /> */}
                        </div>
                        <div className="rightCont60">
                                <div className="logoFooterCont">
                                    <Img fluid={data.datoCmsInfoSite.logoSite.fluid} className="logoFooter" />
                                </div>
                                <ul className="ulFooterSiteMap">
                                    <li className="navItem">
                                        <Link to="/" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.home')}
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/about" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.about')}
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/portfolio" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.portfolio')}
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/blog" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.blog')}
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/ventures" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.ventures')}
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/contact" className="navLinkWhite" activeClassName="activeNavLink">
                                            {t('menu.contact')}
                                        </Link>
                                    </li>
                                </ul>
                                <div className="servicesDiv">
                                    <ul className="servicesUL">
                                        <li className="serviceFooterLink">
                                            {t('footer.ourserv')}
                                        </li>
                                        {
                                            (_lang === "en") ? data.dataServices_en.edges.map(({ node: service }) => {
                                                // console.log(item);
                                                return (
                                                    <li key={service.id}>
                                                        <Link to={`/${service.slug}`} className="serviceFooterLink">
                                                            {service.shortTitle}
                                                        </Link>
                                                    </li>
                                                )
                                            }) :
                                                data.dataServices_es.edges.map(({ node: service }) => {
                                                    // console.log(item);
                                                    return (
                                                        <li key={service.id}>
                                                            <Link to={`/${service.slug}`} className="serviceFooterLink">
                                                                {service.shortTitle}
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                        }
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div className="rowColumFooter">
                        <p className="textFooter">{t('footer.copy')}<span><img src={heartIcon} className="heartIcon" alt="love love love" /></span>{t('footer.by')}&nbsp;&nbsp;</p>
                        <p className="textFooter"><a href="http://saturnoman.com/">@theghost1980</a> | </p>
                        <p className="textFooter"><Link to="/tos">&nbsp;&nbsp;{t('footer.terms')}</Link>&nbsp;&nbsp;|</p>
                        <p className="textFooter"><Link to="/credits">&nbsp;&nbsp;Credits</Link>.</p>
                    </div>
                </footer>
            )}
      />
    )
}

export default Footer;