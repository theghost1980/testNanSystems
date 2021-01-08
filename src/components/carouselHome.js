import React, {  useState, useEffect } from 'react';
import Img from 'gatsby-image';
import Carousel from 'react-bootstrap/Carousel';
import { StaticQuery, graphql } from 'gatsby';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Carouselhome = () => {
    const [mobile, setMobile] = useState(false);

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
            if (_screenWidth <= 544){
                setMobile(true);
            } else {
                setMobile(false);
            }
        });

        return () => {
            window.removeEventListener('resize', () => {
            const _screenWidth = window.innerWidth;
            // console.log(`Actual Width:${_screenWidth}`);
            if (_screenWidth <= 544){
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
                 datoCmsInfoSite {
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
            `}
        render={data => (
            <Carousel className="testDivCar">
                {
                    (!mobile) ? 
                        data.datoCmsInfoSite.carouselHome.map(item => {
                            return (
                                <Carousel.Item key={item.id}>
                                    <Img fluid={item.imageCarousel.fluid} alt={item.imageCaption} className="imgCarHome"/>
                                    <Carousel.Caption>
                                        <h3 className="quotesCarouselHome">{item.imageCaption}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    : 
                        data.datoCmsInfoSite.carouselHomeMobiles.map(item => {
                            return (
                                <Carousel.Item key={item.id}>
                                    <Img fluid={item.imageCarousel.fluid} alt={item.imageCaption} className="imgCarHome"/>
                                    <Carousel.Caption>
                                        <h3 className="quotesCarouselHome">{item.imageCaption}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                }
            </Carousel>
        )}
      />
    )
}

export default Carouselhome;