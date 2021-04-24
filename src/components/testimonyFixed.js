import React, { useEffect, useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
//styles for cards
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
//translations
import { useTranslation } from "react-i18next";

const Testimonyfixed = (props) => {
    //translations
    const { i18n } = useTranslation();
    const _lang = i18n.language;

    return (
        <StaticQuery
        query={graphql`
          query {
            allDatoCmsTestimony {
                edges {
                    node {
                        contentNode {
                            childMarkdownRemark {
                                html
                            }
                        }
                        locale
                        id
                        name
                        title
                        urlProfile
                        profilePicture {
                            fluid {
                                ...GatsbyDatoCmsFluid
                            }
                        }
                        iconLink {
                            fluid {
                                ...GatsbyDatoCmsFluid
                            }
                        }
                    }
                }
            }
          }
        `}
        render={data => (
            <section className="">
                <ul className="ulTestiFixedList">
                    {
                        data.allDatoCmsTestimony.edges
                            .filter(item => item.node.locale === _lang)
                            .map(({ node: testi }) => {

                            return (
                                <div className="testiItem" key={testi.id}>
                                    <div className="bgDivPadd">
                                        <div className="imgContFixedTesti">
                                            <Img fluid={testi.profilePicture.fluid} className="imgTesFixed" alt="..." />
                                        </div>
                                        <h1 className="testiTitleFixed marginLR">"{testi.title}"</h1>
                                        <div className="contentTestiFixed marginLR contrastDivFortext justMarginBottom"
                                            dangerouslySetInnerHTML={{
                                                __html: testi.contentNode.childMarkdownRemark.html
                                            }}
                                        />
                                        <div className="bottomTestiFixedCont marginLR">
                                            <p className="testiPNameFixed">{testi.name}</p>
                                            <a href={testi.urlProfile} target="_blank" rel="noreferrer" title="Click to follow Who said this...">
                                                <Img fluid={testi.iconLink.fluid} className="icon28x28" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </section>
        )}
      />
    )
}

export default Testimonyfixed;