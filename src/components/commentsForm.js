import React from 'react';

const Commentsform = () => {
    return (
        <div className="commentsFormCont">
            <form className="commentsForm" name="contact" method="POST" data-netlify-recaptcha="true" data-netlify="true">
                <h2 className="centeredTitle titlePost">
                    Have any comments?
                </h2>
                <p className="formPComments">
                    <label className="formPComments">Your Name: <input type="text" name="name" /></label>   
                </p>
                <p className="formPComments">
                    <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p className="formPComments">
                    <label>Your Role: <select name="role[]" multiple>
                    <option value="leader">Leader</option>
                    <option value="follower">Follower</option>
                    </select></label>
                </p>
                <p className="formPComments">
                    <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p className="formPComments">
                    <button type="submit">Send</button>
                </p>
                </form>
        </div>
    )
}

export default Commentsform;