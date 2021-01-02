import React, { useState, useEffect } from 'react';
//components
import Layout from '../components/layout';
import { graphql } from 'gatsby';
//media-imgs
import expLightIcon from '../media-imgs/expand-light.png';
import expDarkIcon from '../media-imgs/expand-dark.png';
import collapseLightIcon from '../media-imgs/collapse-light.png';
import collapseDarkIcon from '../media-imgs/collapse-dark.png';
import actualJobIcon from '../media-imgs/actualJob.png';
//translations
import { useTranslation } from "react-i18next";
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';

const Portfolio = (props) => {
    //new code testing ini array
    // const [states, setStates] = useState({});
    //////
    
    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    const dataWorkList = (_lang === 'es' ? props.data.work_es : props.data.work_en);
    const dataSEO = (_lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);
    // console.log('dataWorkList',dataWorkList);
    const initialState = dataWorkList.edges.map(({ node: item }) => {
        return {id: item.id, value: false}
    });
    let [states, setStates] = useState(initialState);
    // console.log('initializing states',states);

    // old code
    // const _itemsArray = dataWorkList.edges.map(({ node: item }) => {
    //     return {id: item.id, value: false}
    // });
    ///////////

    // new code
    // const initialState = dataWorkList.edges.map(({ node: item }) => {
    //         return {id: item.id, value: false}
    // });
    // const [states, setStates] = useState(initialState);
    // console.log('initializing states',states);

    // const handleInit = () => {
    //     setStates({...initialState});
    // }
    // useEffect(() => {
    //     setStates({});
    //     setStates(initialState);
    //     console.log('initializing states inside useeffect',states);
    // },[initialState,dataWorkList]);
    ///////////

    // old code as it was
    // const [states, setStates] = useState(_itemsArray);
    // console.log('states array:',states);
    ////

    const HandleState = (idItem) => {
        // old line of code
        // setStates(prevState => prevState.map(item => item.id === idItem ? {id: item.id,value:!item.value}: item));
        
        // new line of code
        // String(element.id).substr(0,String(element.id).length - 3) === String(work.id).substr(0,String(work.id).length - 3);
        setStates(prevState => prevState.map(item => String(item.id).substr(0,String(item.id).length - 3) === String(idItem).substr(0,String(idItem).length - 3) ? {id: item.id,value:!item.value}: item));
    };

    return (
        <Layout>
            <HelmetDatoCms seo={dataSEO.seoMetaTags}/>
            <div className="portfolioCont">
                <p className="pargraphPortfolio">{t('portfolio.text')}</p>
                <ul className="portfUL">
                    {
                        dataWorkList.edges.map(({ node: work }) => {
                                const expanded = states.find(element => String(element.id).substr(0,String(element.id).length - 3) === String(work.id).substr(0,String(work.id).length - 3));
                                // console.log('trying to find work.id',work.id);
                                // console.log('found',String(expanded.id).substr(0,String(expanded.id).length - 3));
                                // console.log('Value:',expanded.value);
                            return (
                                <li key={work.id}>
                                    <div className={`workCont ${expanded.value ? 'expanded': 'noExpanded' }`}>
                                        <div className="workContRow">
                                            <p className="titlePortfolio">{work.jobTitle}</p>
                                            <div className="iconImgCont" onClick={() => HandleState(work.id)}>
                                                <img src={expanded.value ? collapseLightIcon : expLightIcon } alt="expand view" className="iconExpand"/>
                                            </div>
                                            {   
                                                (!work.dateOut || work.dateOut === ' ' || work.dateOut === null || work.dateOut ==='N/A')
                                                ?
                                                    <div className="actualJobIconCont">
                                                        <img src={actualJobIcon} alt="actual Job" className="actualJobIcon"/>
                                                    </div>
                                                : null
                                            }
                                        </div>
                                        <ul>
                                            <li className="subtitlePortfolio">{work.company}</li>
                                            {
                                                work.accomplishmentsNode.childMarkdownRemark.html !== '' && work.accomplishmentsNode.childMarkdownRemark.html !== null 
                                                    &&
                                                    <li>
                                                        <div className="textPortfolio"
                                                            dangerouslySetInnerHTML={{
                                                                __html: work.accomplishmentsNode.childMarkdownRemark.html
                                                            }}
                                                        />
                                                    </li>
                                            }
                                            <li className="subtitlePortfolio">{t('portfolio.since')} {work.dateIn} {work.dateOut ? `${t('portfolio.until')} ${work.dateOut}`: `${t('portfolio.actual')}`}</li>
                                            <li className="subtitlePortfolio">{work.company}</li>
                                            {
                                                (work.urlCompany !== null && work.urlCompany !== '' && work.urlCompany !== 'N/A' ) &&
                                                <li className="subtitlePortfolio">
                                                    <a href={work.urlCompany} target="_blank" rel="noreferrer">
                                                        {t('portfolio.visit')}
                                                    </a>
                                                </li>
                                            }
                                            <li className="subtitlePortfolio">{work.place}</li>
                                            {/* <li className="subtitlePortfolio">{t('portfolio.salary')}{work.salary}</li> */}
                                            {/* <li>
                                                <div className="textPortfolio"
                                                    dangerouslySetInnerHTML={{
                                                        __html: work.opinionAboutCompanyNode.childMarkdownRemark.html
                                                    }}
                                                />
                                            </li> */}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Layout>
    )
}

export default Portfolio;

// old format date
// dateIn(formatString: "DD:MM:YYYY")
// dateOut(formatString: "DD:MM:YYYY")

export const data = graphql`
    query{
        work_en: allDatoCmsWorkExperience (filter: {locale: {eq: "en"}}, sort: {order: DESC, fields: dateIn}) {
            edges {
                node {
                    accomplishmentsNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    company
                    dateIn(formatString: "YYYY")
                    dateOut(formatString: "YYYY")
                    id
                    jobDescriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    jobTitle
                    locale
                    opinionAboutCompanyNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    place
                    responsibilitiesNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    salary
                    urlCompany
                }
            }
        }
        work_es: allDatoCmsWorkExperience (filter: {locale: {eq: "es"}}, sort: {order: DESC, fields: dateIn}) {
            edges {
                node {
                    accomplishmentsNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    company
                    dateIn(formatString: "YYYY")
                    dateOut(formatString: "YYYY")
                    id
                    jobDescriptionNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    jobTitle
                    locale
                    opinionAboutCompanyNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    place
                    responsibilitiesNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    salary
                    urlCompany
                }
            }
        }
        dataSEO_en: datoCmsSeoPortfolio (locale: {eq: "en"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataSEO_es: datoCmsSeoPortfolio (locale: {eq: "es"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
    }
`;