import React from 'react';
//components
import Layout from '../components/layout';
// translations
import { useTranslation } from 'react-i18next';
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { graphql } from 'gatsby';

const Ventures = (props) => {

    const { t, i18n } = useTranslation();
    const _lang = i18n.language;
    const dataSEO = (_lang === 'es' ? props.data.dataSEO_es : props.data.dataSEO_en);

    return (
        <Layout>
            <HelmetDatoCms seo={dataSEO.seoMetaTags} />
            <div>
                Hi from Ventures;
            </div>
        </Layout>
    )
}

export default Ventures;

export const data = graphql`
    query {
        dataSEO_en: datoCmsSeoVenture(locale: {eq: "en"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        dataSEO_es: datoCmsSeoVenture(locale: {eq: "es"}) {
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
    }
`;