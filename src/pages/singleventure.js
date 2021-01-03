import React from 'react';
//components
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Button from '../components/button';
//components
import Sharebuttons from '../components/shareButton';
//SEO
import { HelmetDatoCms } from 'gatsby-source-datocms';

const SingleVenture = (props) => {
    const data = props.location.state || 
        {
            title: 'Greatest Title Ever',
            // id: venture.id,
            // mainImage: venture.imageVenture.fluid,
            // shortDesc: venture.shortDescriptionNode.childMarkdownRemark.html,
            // content: venture.contentNode.childMarkdownRemark.html,
            // seoData: dataSEO.seoMetaTags
        };
    //for sharebuttons
    const _twitterHandle = "_MsLinda";
    const _url = props.location.href;
    let _titlePost = data.title;
    // if (typeof data.title !== undefined){
    //     if (data.title !== null && data.title !== undefined){
    //         _titlePost = data.title;
    //     }
    // }
    const _tags = [
        'NaNSYSTEMS', 'SolutionsIT', 'automation', 'Niagara'
    ];

    return (
        <Layout>
            <HelmetDatoCms seo={data.seoData}/>
            <div className="singleVentureCont">
                <div className="rowTop">
                    <div className="width50">
                        <h1 className="titleItemVenture">{data.title}</h1>
                        <div className="descItemVenture"
                            dangerouslySetInnerHTML={{
                                __html: data.shortDesc
                            }}
                        />
                        <Button value="Get a Quote by email" type="btnFilled" pathname="/"/>
                        {/* test share buttons */}
                        <Sharebuttons 
                            url={_url} 
                            title={_titlePost} 
                            twitterHandle={_twitterHandle} 
                            tags={_tags} 
                            sizeAll={"35"}
                            align="alignLeftSB" 
                        />
                        {/* end test */}
                    </div>
                    <div className="width50">
                        <Img fluid={data.mainImage} className="shadow"/>
                    </div>
                </div>
                <div className="ventureContent"
                    dangerouslySetInnerHTML={{
                        __html: data.content
                    }}
                />
            </div>
        </Layout>
    )
}

export default SingleVenture;