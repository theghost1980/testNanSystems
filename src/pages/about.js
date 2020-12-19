import React from 'react';
//components
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const About = (props) => {
    return (
        <Layout>
            <div className="cardCont">
                <div className="profilePicCont">
                    <Img fluid={props.data.datoCmsAbout.profilePicNoir.fluid} className="profileImg" />
                </div>
                <div className="textContAbout">
                    <div className="textAbout"
                        dangerouslySetInnerHTML={{
                            __html: props.data.datoCmsAbout.welcomeNode.childMarkdownRemark.html
                        }}
                    />
                    <div className="textAbout"
                        dangerouslySetInnerHTML={{
                            __html: props.data.datoCmsAbout.engineerNode.childMarkdownRemark.html
                        }}
                    />
                </div>
            </div>
            <div className="certCont">
                <ul className="certUL">
                    {
                        props.data.allDatoCmsCertification.edges.map(item => {
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
        </Layout>
    )
}

export default About;

export const data = graphql`
    query{
        datoCmsAbout {
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
        allDatoCmsCertification(sort: {order: DESC, fields: issuedDate}) {
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
    }
`;