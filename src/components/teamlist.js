import React, { useEffect, useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
//components
import Selector from '../components/selector';
//translations
import { useTranslation } from "react-i18next";

const Teamlist = () => {
    //translations
    const { t } = useTranslation();

    return (
        <StaticQuery
        query={graphql`
          query {
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
            team_en: allDatoCmsTeam (filter: {locale: {eq: "en"}}) {
                edges {
                    node {
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
        `}
        render={data => (
            <div className="whiteBG">
                {
                    data.team_es.edges.map(({ node: profile }) => {
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
                                <div className="btnExpandCert">
                                    <p className="noMargins h2Title btnP">{'Expand My Certifications'}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )}
      />
    )
}

export default Teamlist;