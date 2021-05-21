import React from 'react';
//components
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Button from '../components/button';
// translations
import { useTranslation } from 'react-i18next';
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { graphql } from 'gatsby';
//media-imgs
import bottomImg from '../media-imgs/lineBG.png';

const Ventures = (props) => {

    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    const dataSEO = (_lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);
    const dataVenture = (_lang === 'es' ? props.data.dataVenture_es : props.data.dataVenture_en);

    return (
        <Layout>
            <HelmetDatoCms seo={dataSEO.seoMetaTags} />
            <div className="venturesCont">
                {/* <div className="firstDiv">
                    <div className="textVentures"
                        dangerouslySetInnerHTML={{
                            __html: dataVenture.welcomeNode.childMarkdownRemark.html
                        }}
                    />
                    <Img fluid={dataVenture.sidePicture.fluid} className="mainImgVentures" />
                </div>
                <div className="fancyDivSepCont">
                    <img src={bottomImg} alt="fancy Line Sep" className="imgLineSep" />
                </div> */}
                {
                    dataVenture.itemVenture.map(venture => {
                        return (
                            <div
                                key={venture.id}
                                data-sal="slide-right"
                                data-sal-delay="300"
                                data-sal-easing="ease"
                                className="itemVenture"
                            >
                                <div className="contentAllMargins">
                                <div className="ventureItemCont">
                                    <div className="contentVentureItem">
                                        <h1 className="titleItemVenture">{venture.title}</h1>
                                        <div className="descItemVenture"
                                        dangerouslySetInnerHTML={{
                                            __html: venture.shortDescriptionNode.childMarkdownRemark.html
                                        }}
                                        />
                                        <Button 
                                            value={t('button.readmore')}
                                            type="btnNoFilled" 
                                            pathname="/singleventure"
                                            action="move"
                                            data={
                                                {
                                                    title: venture.title,
                                                    id: venture.id,
                                                    mainImage: venture.imageVenture.fluid,
                                                    shortDesc: venture.shortDescriptionNode.childMarkdownRemark.html,
                                                    content: venture.contentNode.childMarkdownRemark.html,
                                                    seoData: dataSEO.seoMetaTags
                                                }
                                            }
                                            // link={{
                                            //     pathname: "/singleventure",
                                            //     data: [
                                            //         venture.title
                                            //     ]
                                            // }} 
                                        />
                                        {/* <img src={bottomImg} alt="smooth lines" className="bgBottom" /> */}
                                    </div>
                                    <Img fluid={venture.imageVenture.fluid} className="itemVentureImg" />
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div
                    data-sal="slide-right"
                    data-sal-delay="300"
                    data-sal-easing="ease"
                    className="itemVenture"
                >
                    {}
                </div> */}
            </div>
        </Layout>
    )
}

export default Ventures;

export const data = graphql`
    query {
        dataSEO_en: datoCmsSeoVenture(locale: {eq: "en"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataSEO_es: datoCmsSeoVenture(locale: {eq: "es"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataVenture_en: datoCmsVenture(locale: {eq: "en"}) {
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            itemVenture {
                id
                shortDescriptionNode {
                    childMarkdownRemark {
                        html
                    }
                }
                title
                imageVenture {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
                contentNode {
                    childMarkdownRemark {
                        html
                    }
                }
            }
            sidePicture {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
        }
        dataVenture_es: datoCmsVenture(locale: {eq: "es"}) {
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            itemVenture {
                id
                shortDescriptionNode {
                    childMarkdownRemark {
                        html
                    }
                }
                title
                imageVenture {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
                contentNode {
                    childMarkdownRemark {
                        html
                    }
                }
            }
            sidePicture {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
        }
    }
`;