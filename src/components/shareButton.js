import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const Sharebuttons = ({ url, twitterHandle, tags, sizeAll, title, align }) => {
  const _tags = String(tags).split(",");
  const _align = align || "";

  return (
    <div className={`shareButtonCont ${_align}`}>
      <FacebookShareButton url={url} className="shareBtn">
        <FacebookIcon size={sizeAll} round={true} />
      </FacebookShareButton>

      <LinkedinShareButton url={url} className="shareBtn">
        <LinkedinIcon size={sizeAll} round={true} />
      </LinkedinShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        via={twitterHandle}
        hashtags={_tags}
        className="shareBtn"
      >
        <TwitterIcon size={sizeAll} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton url={url} className="shareBtn">
        <WhatsappIcon size={sizeAll} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default Sharebuttons;
