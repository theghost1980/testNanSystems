import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Carousel from "react-bootstrap/esm/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import bottomImg from "../media-imgs/lineBG2.png";
import { useTranslation } from "react-i18next";

const Testimony = () => {
  const { i18n } = useTranslation();
  const _lang = i18n.language;

  return (
    <StaticQuery
      query={graphql`
        query {
          allDatoCmsTestimony {
            edges {
              node {
                contentNode {
                  childMarkdownRemark {
                    html
                  }
                }
                locale
                id
                name
                title
                urlProfile
                profilePicture {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
                iconLink {
                  fluid {
                    ...GatsbyDatoCmsFluid
                  }
                }
              }
            }
          }
          # data_es: allDatoCmsTestimony(filter: {locale: {eq: "es"}}) {
          #     edges {
          #         node {
          #             contentNode {
          #                 childMarkdownRemark {
          #                     html
          #                 }
          #             }
          #             id
          #             name
          #             title
          #             urlProfile
          #             profilePicture {
          #                 fluid {
          #                     ...GatsbyDatoCmsFluid
          #                 }
          #             }
          #             iconLink {
          #                 fluid {
          #                     ...GatsbyDatoCmsFluid
          #                 }
          #             }
          #         }
          #     }
          # }
        }
      `}
      render={(data) => (
        <section className="testimonyCont">
          <Carousel className="carouselTestCont">
            {data.allDatoCmsTestimony.edges
              .filter((item) => item.node.locale === _lang)
              .map(({ node: testi }) => {
                return (
                  <Carousel.Item key={testi.id}>
                    <div className="profileImgTestiCont">
                      <Img
                        fluid={testi.profilePicture.fluid}
                        className="profilePicTesti"
                      />
                    </div>
                    <div className="tesTitleCont">
                      <h1 className="testiTitle">"{testi.title}"</h1>
                    </div>
                    <div
                      className="testiContentCont"
                      dangerouslySetInnerHTML={{
                        __html: testi.contentNode.childMarkdownRemark.html,
                      }}
                    />
                    <div className="testBottomCont">
                      <h4>{testi.name}</h4>
                      <div className="iconTestiCont">
                        <a
                          href={testi.urlProfile}
                          target="_blank"
                          rel="noreferrer"
                          title="Click to follow Who said this..."
                        >
                          <Img
                            fluid={testi.iconLink.fluid}
                            className="icon48x48"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="fancyDivSepCont2">
                      <img
                        src={bottomImg}
                        alt="fancy Line Sep"
                        className="imgLineSep"
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </section>
      )}
    />
  );
};

export default Testimony;
