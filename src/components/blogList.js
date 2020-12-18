import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Bloglist = () => {

    return (
            <StaticQuery
                query={graphql`
                query {
                    allDatoCmsBlogPost(sort: {fields: datePublished, order: ASC}, limit: 3) {
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
                            }
                        }
                    }
                }`}

            render={data => (
                <ul className="blogULHome">
                    {
                        data.allDatoCmsBlogPost.edges.map(item => {
                            return (
                                <li key={item.node.id}>
                                    <div className="itemBlogList">
                                        <p className="subtitleHome">{item.node.title}</p>
                                        <p className="spanReadingTime">({item.node.contentNode.childMarkdownRemark.timeToRead} min to read)</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
      />
    )
}

export default Bloglist;