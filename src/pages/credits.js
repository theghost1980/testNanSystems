import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';

const Credits = (props) => {
    return (
        <Layout>
        <div className="creditsCont">
            <h1 className="h2Title">Credits</h1>
            <h3 className="h2Title">This site has been done using all the following tecnologies and resources.</h3>
            <p className="pContrast contentMargin">Even when maybe those big sites are too busy to come and see my work, I have to be grateful. Thank you so much guys. Keep the good work.</p>
            <ul className="ulRowWrapBasic justiAlig bgUl justBorderRounded">
                {
                    props.data.credits.edges.map(({ node: credit }) =>{
                        return (
                            <a href={credit.url} target="_blank" rel="noreferrer">
                                <li className="liImages pointer scaleHovered">
                                    <Img fixed={credit.image.fixed} className="shadowBottom whiteBack justBorderRounded" />
                                    {
                                        credit.legend && <h4>{credit.legend}</h4>
                                    }
                                </li>
                            </a>
                        )
                    })
                }
            </ul>
            
        </div>
        </Layout>
    )
}

export default Credits;

export const data = graphql`
    query {
        credits: allDatoCmsCredit(filter: {locale: {eq: "en"}}) {
            edges {
                node {
                    image {
                        fixed(width: 250, forceBlurhash: false, imgixParams: { fm: "jpg", auto: "compress" }) {
                            ...GatsbyDatoCmsFixed
                        }
                    }
                    url
                    legend
                }
            }
        }
    }
`;