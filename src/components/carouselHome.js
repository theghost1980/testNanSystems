import React, {  useState, useEffect } from 'react';
import Img from 'gatsby-image';
import Carousel from 'react-bootstrap/Carousel';
import Button from '../components/button';
import { StaticQuery, graphql } from 'gatsby';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
//translations
import { useTranslation } from "react-i18next";

const Carouselhome = () => {
    const [mobile, setMobile] = useState(false);
    const { t, i18n } = useTranslation();
    const _lang = i18n.language;

    // function checkWidth(){
    //     const _screenWidth = window.innerWidth;
    //     console.log(`Actual Width:${_screenWidth}`);
    //     if (_screenWidth <= 544){
    //         setMobile(true);
    //     } else {
    //         setMobile(false);
    //     }
    // }

    // const handleResize = () => {
    //     checkWidth();
    // }
    // useEffect(() => {
    //     checkWidth();
    // },[]);

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // }, [handleResize]);

       //test to improve coding
       useEffect(() => {
        window.addEventListener('resize', () => {
            const _screenWidth = window.innerWidth;
            // console.log(`Actual Width:${_screenWidth}`);
            if (_screenWidth <= 736){ //736px
                setMobile(true);
            } else {
                setMobile(false);
            }
        });

        return () => {
            window.removeEventListener('resize', () => {
            const _screenWidth = window.innerWidth;
            // console.log(`Actual Width:${_screenWidth}`);
            if (_screenWidth <= 736){
                setMobile(true);
            } else {
                setMobile(false);
            }
            });
        }
    }, []);
    //end test

    return (
        <StaticQuery
            query={graphql`
            query{
                 allDatoCmsInfoSite {
                    edges {
                        node {
                            locale
                            carouselHome {
                                imageCaption
                                id
                                imageCarousel {
                                    fluid {
                                        ...GatsbyDatoCmsFluid
                                    }
                                }
                            }
                            carouselHomeMobiles {
                                imageCaption
                                id
                                imageCarousel {
                                    fluid {
                                        ...GatsbyDatoCmsFluid
                                    }
                                }
                            }
                        }
                    }
                 }
            }
            `} 
        render={data => (
            <Carousel className="testDivCar">
                {
                    !mobile ? 
                    data.allDatoCmsInfoSite.edges.filter(item => item.node.locale === _lang).map(element => 
                            // console.log(element)
                                element.node.carouselHome.map(imgItem => {
                                    return (
                                        <Carousel.Item key={imgItem.id}>
                                            <div className="img-gradient">
                                                <Img fluid={imgItem.imageCarousel.fluid} alt={imgItem.imageCaption} className="imgCarHome"/>
                                            </div>
                                            <Carousel.Caption>
                                                <h1 className="quotesCarouselHome">
                                                    {imgItem.imageCaption}
                                                    <Button 
                                                        value={t('carousel.tellme')}
                                                        type={"btnNoFilled"}
                                                        extraclass={"btnActCarousel"}
                                                        action={"Link"} 
                                                        pathname={"/ventures"}
                                                        data={null}
                                                    />    
                                                </h1>  
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })
                        )
                    :
                        data.allDatoCmsInfoSite.edges.filter(item => item.node.locale === _lang).map(element => 
                            element.node.carouselHomeMobiles.map(imgItem => {
                                return (
                                    <Carousel.Item key={imgItem.id}>
                                        <div className="img-gradient">
                                            <Img fluid={imgItem.imageCarousel.fluid} alt={imgItem.imageCaption} className="imgCarHome"/>
                                        </div>
                                        <Carousel.Caption>
                                            <h1 className="quotesCarouselHome">
                                                {imgItem.imageCaption}
                                                <Button 
                                                    value={t('carousel.tellme')}
                                                    type={"btnNoFilled"}
                                                    extraclass={"btnActCarousel"}
                                                    action={"Link"} 
                                                    pathname={"/ventures"}
                                                    data={null}
                                                />    
                                            </h1>  
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })
                    )
                }
            </Carousel>
        )}
      />
    )
}

export default Carouselhome;