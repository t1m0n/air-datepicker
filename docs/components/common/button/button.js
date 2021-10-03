import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import css from './button.module.scss';

function Button({children, active, size, bordered, className, promo, onClick, Component = 'button', href} = {}) {

    let button = <Component
        className={cn(css.el, className, {
            [css.sizeS]: size === 's',
            [css.bordered]: bordered,
            [css.promo]: promo,
            [css.active]: active,
        })}
        onClick={onClick}
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
    size: PropTypes.oneOf(['s']),
    bordered: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
