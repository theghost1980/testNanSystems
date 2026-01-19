import React from "react";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Button from "../components/button";
import Sharebuttons from "../components/shareButton";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { useTranslation } from "react-i18next";

const SingleVenture = (props) => {
  const { t } = useTranslation();

  const data = props.location.state || {
    title: "Greatest Title Ever",
  };
  const _twitterHandle = "_MsLinda";
  const _url = props.location.href;
  let _titlePost = data.title;
  const _tags = ["NaNSYSTEMS", "SolutionsIT", "automation", "Niagara"];

  return (
    <Layout>
      <HelmetDatoCms seo={data.seoData} />
      <div className="singleVentureCont">
        <div className="rowTop">
          <div className="width50">
            <h1 className="titleItemVenture">{data.title}</h1>
            <div
              className="descItemVenture"
              dangerouslySetInnerHTML={{
                __html: data.shortDesc,
              }}
            />
            <Button
              value={t("button.getquote")}
              type="btnFilled"
              action="quote"
              data={{ title: data.title }}
            />
            <Sharebuttons
              url={_url}
              title={_titlePost}
              twitterHandle={_twitterHandle}
              tags={_tags}
              sizeAll={"35"}
              align="alignLeftSB"
            />
          </div>
          <div className="width50">
            <Img fluid={data.mainImage} className="shadow" />
          </div>
        </div>
        <div
          className="ventureContent"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      </div>
    </Layout>
  );
};

export default SingleVenture;
