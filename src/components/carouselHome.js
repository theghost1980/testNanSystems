import React from 'react';
import Img from 'gatsby-image';
import Carousel from 'react-bootstrap/Carousel';
import { StaticQuery, graphql } from 'gatsby';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Carouselhome = () => {
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
                    }
                }
            `}
        render={data => (
            <Carousel className="testDivCar">
                {
                    data.datoCmsInfoSite.carouselHome.map(item => {
                        return (
                            <Carousel.Item key={item.imageCaption.id}>
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