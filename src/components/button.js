import React, { useState } from 'react';
import { Link } from 'gatsby';
//components
import QuickQuote from '../components/quickQuote';

const Button = (props) => {
    const { value, type, pathname, data, action, extraclass } = props;
    const _typebtn = type || 'btnNoFilled';
    const _value = value || 'Click me';
    const _pathname = pathname || '/';
    const _data = data || '';
    const _action = action || null;
    const _extraClass = extraclass || null;
    // console.log(props);
    // console.log(`extraclass:${_extraClass}`);

    const [clickQuote, setClickQuote] = useState(false);

    // console.log(_data);

    return (
            <>
                {
                (_action !== null && _action !== "quote") ? <Link to={_pathname} state={_data} className="btnLink">
                                        <div className={`btnX ${_typebtn} ${_extraClass}`}>
                                            {_value}
                                        </div>
                                    </Link>
                                    :
                                    <div className={`btnX ${_typebtn} ${_extraClass}`}
                                        onClick={() => setClickQuote(!clickQuote)}
                                    >
                                        {_value}
                                    </div>
                }
                    {
                        clickQuote &&
                        <div className="bgDivFullFixed extraHeight"> 
                            <div className="componentContFixed">
                                <QuickQuote quote={_data.title} />
                                <div onClick={() => setClickQuote(!clickQuote)} className="btnCloseQuote boldLblInputs">
                                    Close
                                </div>
                            </div>
                        </div>
                    }
            </>
    )
}

export default Button;