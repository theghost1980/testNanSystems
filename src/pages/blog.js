import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
//components
import Layout from '../components/layout';
//translations
import { useTranslation } from "react-i18next";
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';
//media-img
import bottomImg from '../media-imgs/lineBG.png';

const Blog = (props) => {
    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    const dataBlogList = (_lang === 'es' ? props.data.data_es : props.data.data_en);
    const blogImg = (_lang === 'es' ? props.data.datoCmsInfoSite.blogImg_es : props.data.datoCmsInfoSite.blogImg_en);
    const dataSEO = ( _lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);

    return (
        <Layout>
            <HelmetDatoCms seo={dataSEO.seoMetaTags} />
            <div className="blogCont">
                {/* <div className="topSectionBlog">
                    <div className="topTextBlog">
                        <blockquote>
                            {t('blog.quote')}
                            - <a href="https://www.goodreads.com/quotes/1304788-writing-a-book-is-an-adventure-to-begin-with-it#:~:text=%E2%80%9CWriting%20a%20book%20is%20an%20adventure%20to%20begin%20with%2C%20it,him%20out%20to%20the%20public.%E2%80%9D" target="_blank" rel="noreferrer">Churchill</a>
                        </blockquote>
                    </div>
                    <div className="imgCoverCont">
                        <Img fluid={blogImg.fluid} className="blogPageImg" />
                    </div>
                </div> */}
                {/* <hr className="hrBlogPost" /> */}
                {/* <div className="fancyDivSepCont">
                    <img src={bottomImg} alt="fancy Line Sep" className="imgLineSep" />
                </div> */}
                <div className="blogListBlog">
                    <ul className="ulBlogListBlog">
                        {
                            dataBlogList.edges.map(({ node: post }) => {
                                return (
                                    //old
                                        // <li key={item.node.id} className="blogPostItem">
                                        //         <div className="postImgCont">
                                        //             <Img fluid={item.node.coverImage.fluid} className="imgBlogPost" />
                                        //         </div>
                                        //         <div className="postDesc">
                                        //             <p className="boldtext marginTop">{item.node.title}</p>
                                        //             <p className="miniDateBlog">{item.node.datePublished}</p>
                                        //         </div>
                                        // </li>
                                        //end old
                                        <div
                                            key={post.id}
                                            className="itemVenture fullw"
                                        >
                                            <div className="ventureItemCont">
                                                <div className="bgLogoBigBottom">
                                                </div>
                                                <div className="contentVentureItem">
                                                    <Link to={`/blog/${post.slug}`}>
                                                        <h1 className="titleItemVenture">{post.title}</h1>
                                                        <h3 className="titleItemVenture">
                                                            <p>{post.datePublished} - ({post.contentNode.childMarkdownRemark.timeToRead} {t('blogList.readingtime')}</p>
                                                        </h3>
                                                        {/* <h4 className="titleItemVenture">({post.contentNode.childMarkdownRemark.timeToRead} {t('blogList.readingtime')}</h4> */}
                                                        <h6 className="miniDateBlog">
                                                            {post.categories}
                                                        </h6>
                                                    </Link>
                                                </div>
                                                <Img fluid={post.coverImage.fluid} className="itemVentureImg" />
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* <hr className="hrBlog" /> */}
            </div>
        </Layout>
    )
}

export default Blog;

export const data = graphql`
    query{
        datoCmsInfoSite {
            blogImg_en: blogImage {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            blogImg_es: blogImageEs {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            seoMetaTags {
                    ...GatsbyDatoCmsSeoMetaTags
            }
        }
        data_en: allDatoCmsBlogPost(filter:{ locale: {eq: "en"}}, sort: {fields: datePublished, order: DESC}) {
            edges {
                node {
                    id
                    locale
                    slug
                    title
                    datePublished(fromNow: true)
                    contentNode {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    categories
                }
            }
        }
        data_es: allDatoCmsBlogPost(filter:{ locale: {eq: "es"}}, sort: {fields: datePublished, order: DESC}) {
            edges {
                node {
                    id
                    locale
                    slug
                    title
                    datePublished(fromNow: true)
                    contentNode {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    categories
                }
            }
        }
        dataSEO_en: datoCmsSeoBlog(locale: {eq: "en"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataSEO_es: datoCmsSeoBlog(locale: {eq: "es"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
    }
`;