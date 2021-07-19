import React from 'react';
import PropTypes from 'prop-types';
import Code from 'components/code';
import ParamType from './paramType';

import css from './param.module.scss';

function Param({name, type, defaultValue, children} = {}) {
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
            <div className={css.content}>
                {children}
            </div>
        </div>
    );
}

function ParamList({children} = {}) {
    return <div className={css.list}>{children}</div>
}

Param.List = ParamList;
Param.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    children: PropTypes.any
};

export default Param;
