import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';

const Blogpost = (props) => {
    return (
        <Layout>
            <div className="postCont">
                <div className="imgPostCont">
                    <Img fluid={props.data.datoCmsBlogPost.coverImage.fluid} className="coverImgPost" />
                </div>
                <div className="textPostCont">
                    <h2 className="centeredTitle titlePost">{props.data.datoCmsBlogPost.title}</h2>
                    <p className="datePostText centeredTitle">{props.data.datoCmsBlogPost.datePublished}</p>
                    <hr className="hrsinglePost" />
                    <div className="textParaPost"
                        dangerouslySetInnerHTML={{
                            __html: props.data.datoCmsBlogPost.contentNode.childMarkdownRemark.html
                        }}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Blogpost;

export const data = graphql`
    query PostQuery($slug: String!) {
        datoCmsBlogPost(slug: {eq: $slug}) {
            contentNode {
                childMarkdownRemark {
                    html
                }
            }
            slug
            title
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
            datePublished(formatString: "YYYY:MM:DD")
            coverImage {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
        }
    }
`;