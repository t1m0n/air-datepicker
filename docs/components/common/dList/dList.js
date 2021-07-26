import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Code from 'components/code';

import css from './dList.module.scss';

function DList({children} = {}) {
    return (
        <div className={css.el}>
            {children}
        </div>
    );
}

function DListItem({value, values, definition} = {}) {
    return (
        <div className={css.item}>
            <span className={css.valueContainer}>
                <Code inline className={css.value}>{value}</Code>&nbsp;&mdash;&nbsp;
            </span>
            <FormattedMessage id={definition} values={values}/>
        </div>
    )
}

DList.Item = DListItem;
DList.propTypes = {
    children: PropTypes.any
};
DListItem.propTypes = {
    value: PropTypes.string,
    definition: PropTypes.string // message id
}

export default DList;
