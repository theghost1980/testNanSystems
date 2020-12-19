import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
//components
import Layout from '../components/layout';

const Blog = (props) => {
    return (
        <Layout>
            <div className="blogCont">
                <div className="topSectionBlog">
                    <div className="topTextBlog">
                        <blockquote>
                            “Writing a book is an adventure to begin with, it is a toy and an amusement, then it becomes a mistress, and then it becomes a master, and then a tyrant. The last phase is that just as you are about to be reconciled to your servitude, you kill the monster, and fling him out to the public.”
                            - <a href="https://www.goodreads.com/quotes/1304788-writing-a-book-is-an-adventure-to-begin-with-it#:~:text=%E2%80%9CWriting%20a%20book%20is%20an%20adventure%20to%20begin%20with%2C%20it,him%20out%20to%20the%20public.%E2%80%9D" target="_blank" rel="noreferrer">Churchill</a>
                        </blockquote>
                    </div>
                    <div className="imgCoverCont">
                        <Img fluid={props.data.datoCmsInfoSite.blogImage.fluid} className="blogPageImg" />
                    </div>
                </div>
                <hr className="hrBlogPost" />
                <div className="blogListBlog">
                    <ul className="ulBlogListBlog">
                        {
                            props.data.allDatoCmsBlogPost.edges.map(item => {
                                return (
                                    <li key={item.node.id}>
                                        <Link to={`${item.node.slug}`}>
                                            <figure className="figBlogList">
                                                <Img fluid={item.node.coverImage.fluid} />
                                                <figcaption>
                                                    <p className="boldtext marginTop">{item.node.title}</p>
                                                    <p className="miniDateBlog">{item.node.datePublished}</p>
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </li>
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
            blogImage {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
            seoMetaTags {
                    ...GatsbyDatoCmsSeoMetaTags
            }
        }
        allDatoCmsBlogPost(sort: {fields: datePublished, order: DESC}) {
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
                }
            }
        }
    }
`;