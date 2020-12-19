import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
//media-imgs
import heartIcon from '../media-imgs/heart.png';

const Footer = () => {

    return (
            <StaticQuery
                query={graphql`
                query {
                    allDatoCmsSocialProfile {
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
                            <p className="subtitleFooter">Contact me over Social Media</p>
                        </div>
                        <div className="rightCont60">
                                <div className="logoFooterCont">
                                    <Img fluid={data.datoCmsInfoSite.logoSiteWhite.fluid} className="logoFooter" />
                                </div>
                                <ul className="ulFooterSiteMap">
                                    <li className="navItem">
                                        <Link to="/" className="navLinkWhite" activeClassName="activeNavLink">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/about" className="navLinkWhite" activeClassName="activeNavLink">
                                            About
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/portfolio" className="navLinkWhite" activeClassName="activeNavLink">
                                            Portfolio
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/blog" className="navLinkWhite" activeClassName="activeNavLink">
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/ventures" className="navLinkWhite" activeClassName="activeNavLink">
                                            Ventures
                                        </Link>
                                    </li>
                                    <li className="navItem">
                                        <Link to="/contact" className="navLinkWhite" activeClassName="activeNavLink">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className="rowColumFooter">
                        <p className="textFooter">Copyright ©2020 with <span><img src={heartIcon} className="heartIcon" /></span> by <a href="http://saturnoman.com/">@theghost1980</a> | </p>
                        <p className="textFooter"><a href="">&nbsp;&nbsp;Terms of Service</a>.</p>
                    </div>
                </footer>
            )}
      />
    )
}

export default Footer;