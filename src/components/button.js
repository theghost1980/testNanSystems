import React from 'react';
import { Link } from 'gatsby';

const Button = ({ value, type, link }) => {
    const _typebtn = type || 'btnNoFilled';
    const _value = value || 'Click me';
    const _link = link || '/';

    return (
            <Link to={_link} className="btnLink">
                <div className={`btnX ${_typebtn}`}>
                    {_value}
                </div>
            </Link>
    )
}

export default Button;