import React from 'react';
import PropTypes from 'prop-types';

import css from './input.module.scss';

function Input({type='text', placeholder} = {}, ref) {
    return (
        <input
            className={css.el}
            type={type}
            ref={ref}
            placeholder={placeholder}
        />
    );
}

Input.propTypes = {
    type: PropTypes.string
};

export default React.forwardRef(Input);
