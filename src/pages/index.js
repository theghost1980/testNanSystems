import React from 'react';
//components
// import Bloglist from '../components/blogList';
import Layout from '../components/layout';
import Carouselhome from '../components/carouselHome';
//styles
import '../styles/styles.css';
//media-imgs
import autoLogo from '../media-imgs/autocad.png';
import redLogo from '../media-imgs/red-hat-linux.png';
import niagaLogo from '../media-imgs/niagara-framework.svg';
import tridiumLogo from '../media-imgs/tridium.svg';
//translations
import { useTranslation } from "react-i18next";
// queries
import { graphql, Link } from 'gatsby';
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';

const Index = (props) => {

    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    // console.log('_lang index',_lang);
    // console.log('props.data',props.data);
    const dataBlogList = (_lang === 'es' ? props.data.data_es : props.data.data_en);
    const dataSEO = (_lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);
    // console.log('dataBlogList',dataBlogList);

    return (
        <Layout>
           <HelmetDatoCms seo={dataSEO.seoMetaTags} />
           <div className="homeContainer">
               <div className="carouselContainer">
                    <Carouselhome />
               </div>
               <div className="blogListCont">
                   <div className="contDiv40">
                        <p className="titleHome">{t('home.latest')}</p>
                        {/* <Bloglist /> */}
                        {/* testing doing the query here instead of inside a component */}
                        <ul className="blogULHome">
                            {
                                dataBlogList.edges.map(item => {
                                    return (
                                        <li key={item.node.id}>
                                            <div className="itemBlogList">
                                                <Link to={`blog/${item.node.slug}`}>
                                                    <p className="subtitleHome">{item.node.title}</p>
                                                </Link>
                                                <p className="spanReadingTime">({item.node.contentNode.childMarkdownRemark.timeToRead} {t('blogList.readingtime')}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="contDiv60">
                        <p className="titleHome centerAlign">{t('home.some')}</p>
                        <div className="rowLogosCont">
                            <ul className="ulTechListHome">
                                <li>
                                    <img src={autoLogo} alt="AutoCAD professional Ana Echeverria" className="logoHome"/>
                                </li>
                                <li>
                                    <img src={redLogo} alt="RedHat professional Ana Echeverria"  className="logoHome" />
                                </li>
                                <li>
                                    <img src={tridiumLogo} alt="Tridium professional Ana Echeverria"  className="logoHome"/>
                                </li>
                                <li>
                                    <img src={niagaLogo} alt="Niagara professional Ana Echeverria"  className="logoHome" />
                                </li>
                            </ul>
                        </div>
                    </div>
               </div>
           </div>
        </Layout>
    )
}

export default Index;

export const data = graphql`
    query {
        dataSEO_en:   datoCmsInfoSite(locale: {eq: "en"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataSEO_es:   datoCmsInfoSite(locale: {eq: "es"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        data_en: allDatoCmsBlogPost(filter: {locale: {eq: "en"}}, sort: {fields: datePublished, order: ASC}, limit: 3) {
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
        data_es: allDatoCmsBlogPost(filter: {locale: {eq: "es"}}, sort: {fields: datePublished, order: ASC}, limit: 3) {
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
`;