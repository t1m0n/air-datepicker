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

function DoubleSection({children}) {
    return <div className={css.doubleSection}>
        {children}
    </div>
}

Example.propTypes = {};

Example.DoubleSection = DoubleSection;
export default Example;
