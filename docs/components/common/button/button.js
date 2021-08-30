import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import css from './button.module.scss';

function Button({children, className, promo, Component = 'button', href} = {}) {

    let button = <Component
        className={cn(css.el, className, {
            [css.promo]: promo
        })}
    >
        {children}
    </Component>

    if (href) {
        return <Link href={href}>{button}</Link>
    }

    return button;
}

Button.propTypes = {
    promo: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
