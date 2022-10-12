import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import css from './pageTitle.module.scss';

function PageTitle({titleId} = {}) {
    return (
        <h1 className={css.el}>
            <FormattedMessage id={titleId} />
        </h1>
    );
}

PageTitle.propTypes = {
    titleId: PropTypes.string
};

export default PageTitle;
