import React from 'react';

const Commentsform = () => {
    return (
        <div className="commentsFormCont">
            <form className="commentsForm" name="comments" method="POST" data-netlify="true">
                <h2 className="centeredTitle titlePost">
                    Have any comments?
                </h2>
                <p>
                    <label>Your Name: <input type="text" name="name" /></label>   
                </p>
                <p>
                    <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p>
                    <label>Your Role: <select name="role[]" multiple>
                    <option value="leader">Leader</option>
                    <option value="follower">Follower</option>
                    </select></label>
                </p>
                <p>
                    <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
                </form>
        </div>
    )
}

export default Commentsform;