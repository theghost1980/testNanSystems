// const path = require(`path`);
// exports.createPages = ({ graphql, actions}) => {
//     const { createPage } = actions;

//     return new Promise((resolve,reject) => {
//         graphql(`
//             {
//                 allDatoCmsExposition {
//                     edges {
//                       node {
//                         slug
//                         locale
//                       }
//                     }
//                 }
//                 allDatoCmsWork {
//                     edges {
//                       node {
//                         slug
//                         locale
//                       }
//                     }
//                 }
//             }
//         `).then(result => {
//             result.data.allDatoCmsExposition.edges.map(({ node: expo }) => {
//                 createPage({
//                     path: `index/${expo.slug}`,
//                     component: path.resolve(`./src/templates/expo.js`),
//                     context: {
//                         slug: expo.slug,
//                         locale: expo.locale,
//                     },
//                 })
//             })
//             result.data.allDatoCmsWork.edges.map(({ node: work }) => {
//                 console.log('Work Found:');
//                 console.log(work.slug);
//                 createPage({
//                     path: `work/${work.slug}`,
//                     component: path.resolve(`./src/templates/singlework.js`),
//                     context: {
//                         slug: work.slug,
//                         locale: work.locale,
//                     },
//                 })
//             })
//             resolve()
//         })
//     })
// }
