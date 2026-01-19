import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import Carousel from "react-bootstrap/Carousel";
import Button from "../components/button";
import { useStaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const NewCarouselHome = () => {
  const [mobile, setMobile] = useState(false);
  const { t, i18n } = useTranslation();
  const _lang = i18n.language;
  const data = useStaticQuery(graphql`
    query {
      carousel: allDatoCmsInfoSite {
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
  `);

  function checkWidth() {
    window.innerWidth <= 736 ? setMobile(true) : setMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);
  const dataSource =
    _lang === "en"
      ? data.carousel.edges.filter((array) => array.node.locale === "en")
      : data.carousel.edges.filter((array) => array.node.locale === "es");

  const innerData = mobile
    ? dataSource[0].node.carouselHomeMobiles
    : dataSource[0].node.carouselHome;

  return (
    <Carousel className="testDivCar">
      {innerData.map((item) => {
        return (
          <Carousel.Item key={item.id}>
            <div className="img-gradient">
              <Img
                fluid={item.imageCarousel.fluid}
                alt={item.imageCaption}
                className="imgCarHome"
              />
            </div>
            <Carousel.Caption>
              <h1 className="quotesCarouselHome">
                {item.imageCaption}
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
      })}
    </Carousel>
  );
};

export default NewCarouselHome;
