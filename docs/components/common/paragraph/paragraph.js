import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FormattedMessage} from 'react-intl';

import css from './paragraph.module.scss';

function Paragraph({id, doubleOffset, values, className} = {}) {
    return (
        <FormattedMessage
            className={cn(className, {
                [css.doubleOffset]: doubleOffset
            })}
            tagName={'p'}
            id={id}
            values={values}
        />
    );
}

Paragraph.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    values: PropTypes.object
};

export default Paragraph;
