const path = require(`path`);

// Rutas de src/pages: un servicio con uno de estos slugs pisaría esa página.
const FIXED_PATHS = [
  `blog`,
  `contact`,
  `about`,
  `aboutNew`,
  `portfolio`,
  `ventures`,
  `tos`,
  `privacy`,
  `credits`,
  `404`,
];

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  return graphql(`
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
    if (result.errors) {
      reporter.panicOnBuild(
        `createPages: the DatoCMS query failed, no blog or service pages were created`,
        result.errors
      );
      return;
    }

    // Cada contenido llega una vez por idioma (es y en) con el mismo slug y las
    // plantillas piden los dos idiomas por $slug: basta una página por slug.
    const postSlugs = new Set();
    result.data.allDatoCmsBlogPost.edges.forEach(({ node: blog }) => {
      if (postSlugs.has(blog.slug)) return;
      postSlugs.add(blog.slug);
      createPage({
        path: `blog/${blog.slug}`,
        component: path.resolve(`./src/templates/blogpost.js`),
        context: {
          slug: blog.slug,
        },
      });
    });

    const techSlugs = new Set();
    result.data.allDatoCmsTechnology.edges.forEach(({ node: tech }) => {
      if (techSlugs.has(tech.slug)) return;
      techSlugs.add(tech.slug);
      if (FIXED_PATHS.includes(tech.slug)) {
        reporter.warn(
          `createPages: the technology slug "${tech.slug}" matches a fixed page of the site`
        );
      }
      createPage({
        path: `/${tech.slug}`,
        component: path.resolve(`./src/templates/technology.js`),
        context: {
          slug: tech.slug,
        },
      });
    });
  });
};
