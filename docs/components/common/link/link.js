import React from 'react';
import PropTypes from 'prop-types';
import {default as NextLink} from 'next/link';

import css from './link.module.scss';

function Link({href, children, ...rest} = {}) {
    return (
        <NextLink href={href} {...rest}>
            <a className={css.el} target={rest.target}>{children}</a>
        </NextLink>
    );
}

Link.propTypes = {};

export default Link;
