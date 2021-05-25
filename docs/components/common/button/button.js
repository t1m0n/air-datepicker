import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import css from './button.module.scss';

function Button({children, promo, route} = {}) {
    return (
        <button className={cn(css.el, {
            [css.promo]: promo
        })}>
            {children}
        </button>
    );
}

Button.propTypes = {
    promo: PropTypes.bool
};

export default Button;
