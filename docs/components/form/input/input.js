import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import css from './input.module.scss';

function Input({type='text', value, className, onChange, onFocus, onBlur, placeholder, readonly} = {}, ref) {
    return (
        <input
            className={cn(css.el, className)}
            type={type}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
        />
    );
}

Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    readonly: PropTypes.bool,
};

export default React.forwardRef(Input);
