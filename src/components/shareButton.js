import React from 'react';
//share buttons & icons
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

const Sharebuttons = ({url,twitterHandle,tags,sizeAll,title}) => {
    return (
        <div className="shareButtonCont">
            <FacebookShareButton url={url} className="shareBtn">
                <FacebookIcon size={sizeAll} round={true} />
            </FacebookShareButton>

            <LinkedinShareButton url={url} className="shareBtn">
                <LinkedinIcon size={sizeAll} round={true} />
            </LinkedinShareButton>

            <TwitterShareButton url={url} title={title} via={twitterHandle} hashtags={tags} className="shareBtn">
                <TwitterIcon size={sizeAll} round={true} />
            </TwitterShareButton>

            <WhatsappShareButton url={url} className="shareBtn">
                <WhatsappIcon size={sizeAll} round={true} />
            </WhatsappShareButton>

        </div>
    )
}

export default Sharebuttons;