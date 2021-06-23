import React from 'react';
import PropTypes from 'prop-types';
import {default as NextLink} from 'next/link';

import css from './link.module.scss';

function Link({href, children} = {}) {
    return (
        <NextLink href={href}>
            <a className={css.el}>{children}</a>
        </NextLink>
    );
}

Link.propTypes = {};

export default Link;
