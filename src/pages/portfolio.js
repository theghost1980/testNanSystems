import React, { useState } from 'react';
//components
import Layout from '../components/layout';
import { graphql } from 'gatsby';
//media-imgs
import expLightIcon from '../media-imgs/expand-light.png';
import expDarkIcon from '../media-imgs/expand-dark.png';
import collapseLightIcon from '../media-imgs/collapse-light.png';
import collapseDarkIcon from '../media-imgs/collapse-dark.png';

const Portfolio = (props) => {
    // const [expanded, setExpanded] = useState(false);
    const _itemsArray = props.data.allDatoCmsWorkExperience.edges.map(({ node: item }) => {
        return {id: item.id, value: false}
    });
    const [states, setStates] = useState(_itemsArray);
    // console.log(states);

    const HandleState = (idItem) => {
        setStates(prevState => prevState.map(item => item.id === idItem ? {id: item.id,value:!item.value}: item));
    };

    return (
        <Layout>
            <div className="portfolioCont">
                <p className="pargraphPortfolio">During more than 6 years of experience, I have been able to work on medium and large projects. Each experience has been of great help in completing my skills as an engineer.</p>
                <ul className="portfUL">
                    {
                        props.data.allDatoCmsWorkExperience.edges.map(({ node: work }) => {
                            const expanded = states.find(element => element.id === work.id);

                            return (
                                <li key={work.id}>
                                    <div className={`workCont ${expanded.value ? 'expanded': 'noExpanded' }`}>
                                        <div className="workContRow">
                                            <p className="titlePortfolio">{work.jobTitle}</p>
                                            <div className="iconImgCont" onClick={() => HandleState(work.id)}>
                                                <img src={expanded.value ? collapseLightIcon : expLightIcon } alt="expand view" className="iconExpand"/>
                                            </div>
                                        </div>
                                        <ul>
                                            <li className="subtitlePortfolio">{work.company}</li>
                                            <li>
                                                <div className="textPortfolio"
                                                    dangerouslySetInnerHTML={{
                                                        __html: work.accomplishmentsNode.childMarkdownRemark.html
                                                    }}
                                                />
                                            </li>
                                            <li className="subtitlePortfolio">Working since: {work.dateIn} {work.dateOut ? `Until: ${work.dateOut}`: 'Actual Job'}</li>
                                            <li className="subtitlePortfolio">{work.company}</li>
                                            {
                                                (work.urlCompany !== null && work.urlCompany !== '' && work.urlCompany !== 'N/A' ) &&
                                                <li className="subtitlePortfolio">
                                                    <a href={work.urlCompany} target="_blank" rel="noreferrer">
                                                        Visit Company Web Site
                                                    </a>
                                                </li>
                                            }
                                            <li className="subtitlePortfolio">{work.place}</li>
                                            <li className="subtitlePortfolio">Wage: ${work.salary}</li>
                                            <li>
                                                <div className="textPortfolio"
                                                    dangerouslySetInnerHTML={{
                                                        __html: work.opinionAboutCompanyNode.childMarkdownRemark.html
                                                    }}
                                                />
                                            </li>
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

export const data = graphql`
    query{
        allDatoCmsWorkExperience {
            edges {
                node {
                    accomplishmentsNode {
                        childMarkdownRemark {
                            html
                        }
                    }
                    company
                    dateIn(formatString: "DD:MM:YYYY")
                    dateOut(formatString: "DD:MM:YYYY")
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
    }
`;