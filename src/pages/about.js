import React, { useState } from 'react';
//components
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
//translations
import { useTranslation } from "react-i18next";
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Teamlist from '../components/teamlist';

const About = (props) => {
    const [expandCerts, setExpandCerts] = useState(false);
    const { i18n } = useTranslation();
    const _lang = i18n.language;
    const dataAbout = (_lang === 'es' ? props.data.data_es : props.data.data_en);
    const dataCert = ( _lang === 'es' ? props.data.dataCert_es : props.data.dataCert_en);
    const dataTeam = (_lang === 'es') ? props.data.team_es : props.data.team_en;

    return (
        <Layout>
            <HelmetDatoCms seo={dataAbout.seoMetaTags} />
            <div className="cardCont">
                <div className="profilePicCont">
                    <Img fluid={dataAbout.profilePic.fluid} className="profileImg" />
                </div>
                    <div className="textContAbout">
                        <div className="textAbout"
                            dangerouslySetInnerHTML={{
                                __html: dataAbout.welcomeNode.childMarkdownRemark.html
                            }}
                        />
                        <div className="textAbout"
                            dangerouslySetInnerHTML={{
                                __html: dataAbout.engineerNode.childMarkdownRemark.html
                            }}
                        />
                        <h3 className="h2Title goRight">Ana Echeverría - CEO</h3>
                    </div>
                    <div className="btnExpandCert" onClick={() => setExpandCerts(!expandCerts)}>
                        <p className="noMargins h2Title btnP">
                            { _lang === 'en' ? 'Certifications & Memberships' : 'Certificados & Membresías'}
                        </p>
                    </div>
            </div>
            {
                expandCerts &&
                <div className="certCont">
                    <ul className="certUL">
                        {
                            dataCert.edges.map(item => {
                                return (
                                    <li key={item.node.id} className="divLiCert">
                                        <div className="imgCertCont">
                                            <Img fluid={item.node.certificationLogo.fluid} className="imgCert" />
                                        </div>
                                        <hr className="hrAbout" />
                                        <p className="subtitleAbout boldText">Certification: {item.node.title}</p>
                                        <p className="subtitleAbout">Issued Date: {item.node.issuedDate}</p>
                                        <div className="textMiniAbout"
                                            dangerouslySetInnerHTML={{
                                                __html: item.node.descriptionNode.childMarkdownRemark.html
                                            }}
                                        />
                                        <p className="subtitleAbout">Expertise: {item.node.areaExpertise}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            {/* <Teamlist /> */}
            {
                dataTeam.edges.map(({ node: profile }) => {
                    return (
                        <div key={profile.id} className="cardTeam">
                            <div className="imgCont">
                                <Img fluid={profile.profilePicture.fluid} className="teamImg" />
                            </div>
                            <div className="contentTeam">
                                <h2 className="h2Title">{profile.jobTitle}</h2>
                                <div className="contentMargin"
                                    dangerouslySetInnerHTML={{
                                        __html: profile.descriptionNode.childMarkdownRemark.html
                                    }}
                                />
                                <h3 className="h2Title rigthted">{profile.name}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </Layout>
    )
}

export default About;

export const data = graphql`
    query{
        data_en: datoCmsAbout (locale: {eq: "en"}) {
            engineerNode {
                childMarkdownRemark {
                    html
                }
            }
            id
            profilePic {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            profilePicNoir {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        data_es: datoCmsAbout (locale: {eq: "es"}) {
            engineerNode {
                childMarkdownRemark {
                    html
                }
            }
            id
            profilePic {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            profilePicNoir {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataCert_en: allDatoCmsCertification(filter: {locale: {eq: "en"}},sort: {order: DESC, fields: issuedDate}) {
            edges {
                node {
                    areaExpertise
                    certificationLogo {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    descriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    id
                    issuedDate(formatString: "YYYY-MM-DD")
                    title
                }
            }
        }
        dataCert_es: allDatoCmsCertification(filter: {locale: {eq: "es"}},sort: {order: DESC, fields: issuedDate}) {
            edges {
                node {
                    areaExpertise
                    certificationLogo {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    descriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    id
                    issuedDate(formatString: "YYYY-MM-DD")
                    title
                }
            }
        }
        team_es: allDatoCmsTeam (filter: {locale: {eq: "es"}}, sort: {fields: name, order: DESC}) {
            edges {
                node {
                    profilePicture {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    descriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    id
                    jobTitle
                    name
                }
            }
        }
        team_en: allDatoCmsTeam (filter: {locale: {eq: "en"}}, sort: {fields: name, order: DESC}) {
            edges {
                node {
                    profilePicture {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    descriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    id
                    jobTitle
                    name
                }
            }
        }  
    }
`;