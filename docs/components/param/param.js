import React from 'react';
import PropTypes from 'prop-types';
import Code from 'components/code';
import ParamType from './paramType';
import {FormattedMessage} from 'react-intl';
import cn from 'classnames';

import css from './param.module.scss';

function Param({name, type, definition, defaultValue, children} = {}) {
    return (
        <div className={css.el}>
            <div className={css.paramRow}>
                <div className={css.paramName}>{name}</div>
                <ParamType>{type}</ParamType>
                {defaultValue
                    ? <div className={css.defaultValue}>
                        =&nbsp;<Code inline bgTransparent>{defaultValue}</Code>
                    </div>
                    : ''
                }
            </div>
            {definition && <>
                &nbsp;&mdash; <FormattedMessage id={definition} />
            </>}
            {children &&
            <div className={css.content}>
                {children}
            </div>
            }
        </div>
    );
}

function ParamList({children, nested} = {}) {
    return <div
        className={cn(css.list, {
            [css.nestedList]: nested
        })}
    >
        {children}
    </div>
}

Param.List = ParamList;
Param.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    children: PropTypes.any
};

export default Param;
