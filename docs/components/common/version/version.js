import React from 'react';
import {version} from 'components/airDatepicker';
import PropTypes from 'prop-types';
import cn from 'classnames';

import css from './version.module.scss';

function Version({className} = {}) {
    return (
        <div className={cn(css.el, className)}>
            v{version}
        </div>
    );
}

Version.propTypes = {
    className: PropTypes.string
};

export default Version;
