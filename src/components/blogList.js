import { StaticQuery, graphql, Link } from "gatsby";
import { useTranslation } from "react-i18next";

const Bloglist = () => {
  const { t } = useTranslation();

  return (
    <StaticQuery
      query={graphql`
        query {
          allDatoCmsBlogPost(
            sort: { fields: datePublished, order: ASC }
            limit: 3
          ) {
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
        }
      `}
      render={(data) => (
        <ul className="blogULHome">
          {data.allDatoCmsBlogPost.edges.map((item) => {
            return (
              <li key={item.node.id}>
                <div className="itemBlogList">
                  <Link to={`blog/${item.node.slug}`}>
                    <p className="subtitleHome">{item.node.title}</p>
                  </Link>
                  <p className="spanReadingTime">
                    ({item.node.contentNode.childMarkdownRemark.timeToRead}{" "}
                    {t("blogList.readingtime")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    />
  );
};

export default Bloglist;
