import React from 'react';
import PropTypes from 'prop-types';

import css from './contentGrid.module.scss';

function ContentGrid({children} = {}) {
    return (
        <div className={css.el}>
            {children}
        </div>
    );
}

ContentGrid.propTypes = {};

export default ContentGrid;
