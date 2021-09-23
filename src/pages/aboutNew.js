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
import Sharebuttons from '../components/shareButton';

const AboutNew = (props) => {

    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    // const dataSEO = (_lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);
    const dataVenture = (_lang === 'es' ? props.data.dataVenture_es : props.data.dataVenture_en);

     //for sharebuttons
     const _twitterHandle = "_MsLinda";
     const _url = props.location.href;
     let _titlePost = data.title;
     const _tags = [
         'NaNSYSTEMS', 'SolutionsIT', 'automation', 'Niagara'
     ];
     //END for share buttons

    return (
        <Layout>
            <div className="venturesCont">
                <div className="textAboutUs">
                    <div className="innerAboutUs"
                        dangerouslySetInnerHTML={{
                            __html: dataVenture.welcomeNode.childMarkdownRemark.html
                        }}
                    />
                    <div>
                        <Sharebuttons 
                            url={_url} 
                            title={_titlePost} 
                            twitterHandle={_twitterHandle} 
                            tags={_tags} 
                            sizeAll={"30"}
                            align="justAligItems justMarginBottom" 
                        />
                    </div>
                </div>
                <ul className="ulAboutUsCards">
                    {
                        dataVenture.aboutarea.map(aboutItem => {
                            return (
                                <li>
                                    <div className="cardAboutUs">
                                        <Img fluid={aboutItem.image.fluid} className="imgCard" />
                                        <h3 className="titleItemVenture">{aboutItem.title}</h3>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    dataVenture.itemAboutus.map(venture => {
                        return (
                            <div
                                key={venture.id}
                                data-sal="slide-right"
                                data-sal-delay="300"
                                data-sal-easing="ease"
                                className="itemAboutUs"
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
                                    </div>
                                    <Img fluid={venture.imageVenture.fluid} className="itemAboutUsImg" />
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="aloneBtnActCall">
                <Button 
                    value={t('button.getquote')}
                    type="btnFilled" 
                    action="quote"
                    data= {{ title: data.title }}
                />
            </div>
        </Layout>
    )
}

export default AboutNew;

export const data = graphql`
    query {
        # dataSEO_en: datoCmsSeoVenture(locale: {eq: "en"}) {
        #     seoMetaTags {
        #         ...GatsbyDatoCmsSeoMetaTags
        #     }
        # }
        # dataSEO_es: datoCmsSeoVenture(locale: {eq: "es"}) {
        #     seoMetaTags {
        #         ...GatsbyDatoCmsSeoMetaTags
        #     }
        # }
        dataVenture_en: datoCmsAboutnew(locale: {eq: "en"}) {
            aboutarea {
                title
                image {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
            }
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            itemAboutus {
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
            # sidePicture {
            #     fluid {
            #         ...GatsbyDatoCmsFluid
            #     }
            # }
        }
        dataVenture_es: datoCmsAboutnew(locale: {eq: "es"}) {
            aboutarea {
                title
                image {
                    fluid {
                        ...GatsbyDatoCmsFluid
                    }
                }
            }
            welcomeNode {
                childMarkdownRemark {
                    html
                }
            }
            itemAboutus {
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
            # sidePicture {
            #     fluid {
            #         ...GatsbyDatoCmsFluid
            #     }
            # }
        }
    }
`;