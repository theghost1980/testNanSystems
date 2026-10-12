import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Layout from "../components/layout";
import "../styles/styles.css";

const Notfound = (props) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet title={`${t("notFound.title")} | NaNSYSTEMS.us`} />
      <div className="notFoundImgCont">
        <Img
          fluid={props.data.datoCmsInfoSite.notFoundImg.fluid}
          className="notFoundImg"
        />
      </div>
    </Layout>
  );
};

export default Notfound;

export const data = graphql`
  query {
    datoCmsInfoSite {
      notFoundImg {
        fluid {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;
