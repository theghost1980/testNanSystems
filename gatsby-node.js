const path = require(`path`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsBlogPost {
          edges {
            node {
              slug
              title
              locale
            }
          }
        }
        allDatoCmsTechnology {
          edges {
            node {
              slug
              title
              locale
            }
          }
        }
      }
    `).then((result) => {
      result.data.allDatoCmsBlogPost.edges.map(({ node: blog }) => {
        createPage({
          path: `blog/${blog.slug}`,
          component: path.resolve(`./src/templates/blogpost.js`),
          context: {
            slug: blog.slug,
            locale: blog.locale,
          },
        });
      });
      result.data.allDatoCmsTechnology.edges.map(({ node: tech }) => {
        createPage({
          path: `/${tech.slug}`,
          component: path.resolve(`./src/templates/technology.js`),
          context: {
            slug: tech.slug,
            locale: tech.locale,
          },
        });
      });

      resolve();
    });
  });
};
