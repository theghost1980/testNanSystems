import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
//components
import Sharebuttons from '../components/shareButton';
//translations
import { useTranslation } from "react-i18next";

const Blogpost = (props) => {
    const { i18n } = useTranslation();
    const _lang = i18n.language;
    const dataPost = (_lang === 'es' ? props.data.post_es : props.data.post_en);
    //for sharebuttons
    const _twitterHandle = "_MsLinda";
    const _url = props.location.href;
    const _titlePost = dataPost.title;
    const _tags = dataPost.categories;
    // console.log('shareButtons props-----');
    // console.log(`href:${_url}`);
    // console.log(`title:${_titlePost}`);
    // console.log(`tags:${_tags}`);
    // console.log('end shareButtons props----');

    return (
        <Layout>
            <div className="postCont">
                <div className="imgPostCont">
                    <Img fluid={dataPost.coverImage.fluid} className="coverImgPost" />
                </div>
                {/* test share buttons */}
                <Sharebuttons 
                    url={_url} 
                    title={_titlePost} 
                    twitterHandle={_twitterHandle} 
                    tags={_tags} 
                    sizeAll={"35"}
                />
                {/* end test */}
                <div className="textPostCont">
                    <h2 className="centeredTitle titlePost">{dataPost.title}</h2>
                    <p className="datePostText centeredTitle">{dataPost.datePublished}</p>
                    <hr className="hrsinglePost" />
                    <div className="textParaPost"
                        dangerouslySetInnerHTML={{
                            __html: dataPost.contentNode.childMarkdownRemark.html
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
        post_en: datoCmsBlogPost(slug: {eq: $slug}, locale: {eq : "en"}) {
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
            categories
        }
        post_es: datoCmsBlogPost(slug: {eq: $slug}, locale: {eq : "es"}) {
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
            categories
        }
    }
`;