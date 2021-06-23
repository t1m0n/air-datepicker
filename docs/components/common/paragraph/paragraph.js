import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

function Paragraph({id, values, className} = {}) {
    return (
        <FormattedMessage className={className} tagName={'p'} id={id} values={values} />
    );
}

Paragraph.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    values: PropTypes.object
};

export default Paragraph;
