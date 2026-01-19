import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import Carousel from "react-bootstrap/Carousel";
import Button from "../components/button";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const Carouselhome = () => {
  const [setMobile] = useState(false);
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;

  const resize = () => {
    const _screenWidth = window.innerWidth;
    if (_screenWidth <= 736) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener(resize);

    return () => {
      window.removeEventListener(resize);
    };
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query {
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
      render={(data) => (
        <Carousel className="testDivCar">
          {data.allDatoCmsInfoSite.edges
            .filter((item) => item.node.locale === _lang)
            .map((element) =>
              element.node.carouselHome.map((imgItem) => {
                return (
                  <Carousel.Item key={imgItem.id}>
                    <div className="img-gradient">
                      <Img
                        fluid={imgItem.imageCarousel.fluid}
                        alt={imgItem.imageCaption}
                        className="imgCarHome"
                      />
                    </div>
                    <Carousel.Caption>
                      <h1 className="quotesCarouselHome">
                        {imgItem.imageCaption}
                        <Button
                          value={t("carousel.tellme")}
                          type={"btnNoFilled"}
                          extraclass={"btnActCarousel"}
                          action={"Link"}
                          pathname={"/ventures"}
                          data={null}
                        />
                      </h1>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              }),
            )}
        </Carousel>
      )}
    />
  );
};

export default Carouselhome;
