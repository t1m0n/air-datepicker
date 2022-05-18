import React from 'react';
import PropTypes from 'prop-types';
import Code from 'components/code';
import ParamType from './paramType';
import {FormattedMessage} from 'react-intl';
import cn from 'classnames';

import css from './param.module.scss';

function Param({name, addId = true, type, definition, definitionValues, defaultValue, children} = {}) {
    return (
        <div className={css.el}>
            <div className={css.paramRow} id={addId ? name : undefined}>
                <div className={css.paramName}>{name}</div>
                <div className={css.paramProps}>
                    <ParamType>{type}</ParamType>
                    {defaultValue
                        ? <div className={css.defaultValue}>
                            =&nbsp;<Code inline bgTransparent>{defaultValue}</Code>
                        </div>
                        : ''
                    }
                </div>
            </div>
            {definition && <>
                &nbsp;&mdash; <FormattedMessage id={definition} values={definitionValues} />
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
    children: PropTypes.any,
    definitionValues: PropTypes.object,
};

export default Param;
