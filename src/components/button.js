import React from 'react';
import { Link } from 'gatsby';

const Button = ({ value, type, pathname, data }) => {
    const _typebtn = type || 'btnNoFilled';
    const _value = value || 'Click me';
    const _pathname = pathname || '/';
    const _data = data || '';
    // console.log(_data);

    return (
            <Link to={_pathname} state={_data} className="btnLink">
                <div className={`btnX ${_typebtn}`}>
                    {_value}
                </div>
            </Link>
    )
}

export default Button;