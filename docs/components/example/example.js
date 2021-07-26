import React from 'react';
import PropTypes from 'prop-types';

import css from './example.module.scss';

function Example({children, titleId} = {}) {
    return (
        <div className={css.el}>
            {children}
        </div>
    );
}

Example.propTypes = {};

export default Example;
