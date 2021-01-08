import React, { useEffect } from 'react';
//components
// import Bloglist from '../components/blogList';
import Layout from '../components/layout';
import Carouselhome from '../components/carouselHome';
import Button from '../components/button';
import Img from 'gatsby-image';
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
    const dataVenture = (_lang === 'es' ? props.data.dataVenture_es : props.data.dataVenture_en);
    // console.log('dataBlogList',dataBlogList);

    // useEffect(() => {
    //     // accesibility code
    //     // <!-- Accessibility Code for "dreamy-keller-b0a352.netlify.app" -->
    //     window.interdeal = { "sitekey": "570f10caadcf593e2b70c3ad9f7beb4d", "Position": "Left", "Menulang": "EN", "domains": { "js": "https://cdn.equalweb.com/", "acc": "https://access.equalweb.com/" }, "btnStyle": { "scale": [ "0.7", "0.7" ], "icon": { "type": 13, "shape": "circle", "outline": false }, "color": { "main": "#285790", "second": "" } } }; (function(doc, head, body){ var coreCall = doc.createElement('script'); coreCall.src = 'https://cdn.equalweb.com/core/2.1.8/accessibility.js'; coreCall.defer = true; coreCall.integrity = 'sha512-tA0/58RaxqQMY+p5wW7LgZM88ckav7DG0iT6VEUqGVyFvH6PcFkmMVuWQgqftDp3BYYHxjeYTAX14Ct7DS/fRQ=='; coreCall.crossOrigin = 'anonymous'; coreCall.setAttribute('data-cfasync', true ); body? body.appendChild(coreCall) : head.appendChild(coreCall); })(document, document.head, document.body);
    //     // end test
    // },[]);

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
               <div className="technologiesContHome">
               {
                    dataVenture.edges.map(({ node: tech }) => {
                        return (
                            <div
                                key={tech.id}
                                // data-sal="slide-right"
                                // data-sal-delay="300"
                                // data-sal-easing="ease"
                                className="itemVenture"
                            >
                                <div className="ventureItemCont">
                                    <div className="contentVentureItem">
                                        <h1 className="titleItemVenture">{tech.title}</h1>
                                        <div className="descItemVenture"
                                        dangerouslySetInnerHTML={{
                                            __html: tech.shortDescriptionNode.childMarkdownRemark.html
                                        }}
                                        />
                                        <Button 
                                            value={t('button.readmore')}
                                            type="btnNoFilled" 
                                            action="Link"
                                            pathname={`/${tech.slug}`}
                                            data={
                                                {
                                                    title: tech.title,
                                                    id: tech.id,
                                                    mainImage: tech.coverImage.fluid,
                                                    shortDesc: tech.shortDescriptionNode.childMarkdownRemark.html,
                                                    content: tech.contentNode.childMarkdownRemark.html,
                                                    seoData: dataSEO.seoMetaTags
                                                }
                                            }
                                        />
                                    </div>
                                    <Img fluid={tech.coverImage.fluid} className="itemVentureImg" />
                                </div>
                            </div>
                        )
                    })
                }
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
        dataVenture_en: allDatoCmsTechnology(filter: {locale: {eq: "en"}}) {
            edges {
                node {
                    coverImage {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    contentNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    shortDescriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    slug
                    title
                    id
                }
            }
        }
        dataVenture_es: allDatoCmsTechnology(filter: {locale: {eq: "es"}}) {
            edges {
                node {
                    coverImage {
                        fluid {
                            ...GatsbyDatoCmsFluid
                        }
                    }
                    contentNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    shortDescriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    slug
                    title
                    id
                }
            }
        }
    }
`;