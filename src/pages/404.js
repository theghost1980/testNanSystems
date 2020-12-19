import React from 'react';
import { graphql } from 'gatsby';
//components
import Img from 'gatsby-image';
import Layout from '../components/layout';

const Notfound = (props) => {
    return (
        <Layout>
            <div className="notFoundImgCont">
                <Img fluid={props.data.datoCmsInfoSite.notFoundImg.fluid} className="notFoundImg" />
            </div>
        </Layout>
    )
}

export default Notfound;

export const data = graphql`
    query{
        datoCmsInfoSite {
            notFoundImg {
                fluid {
                    ...GatsbyDatoCmsFluid
                }
            }
        }
    }
`;