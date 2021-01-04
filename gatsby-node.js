const path = require(`path`);
exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions;

    return new Promise((resolve,reject) => {
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
        `).then(result => {
            //for blog
            result.data.allDatoCmsBlogPost.edges.map(({ node: blog }) => {
                createPage({
                    path: `blog/${blog.slug}`,
                    component: path.resolve(`./src/templates/blogpost.js`),
                    context: {
                        slug: blog.slug,
                        locale: blog.locale,
                    },
                })
            })
            //for technologies
            result.data.allDatoCmsTechnology.edges.map(({ node: tech }) => {
                // console.log(`found tech:${tech.title}`);

                createPage({
                    path: `/${tech.slug}`,
                    component: path.resolve(`./src/templates/technology.js`),
                    context: {
                        slug: tech.slug,
                        locale: tech.locale,
                    },
                })
            })
            // result.data.allDatoCmsWork.edges.map(({ node: work }) => {
            //     console.log('Work Found:');
            //     console.log(work.slug);
            //     createPage({
            //         path: `work/${work.slug}`,
            //         component: path.resolve(`./src/templates/singlework.js`),
            //         context: {
            //             slug: work.slug,
            //             locale: work.locale,
            //         },
            //     })
            // })
            resolve()
        })
    })
}
