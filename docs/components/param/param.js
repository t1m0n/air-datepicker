import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Code from 'components/code';
import ParamType from './paramType';
import {FormattedMessage} from 'react-intl';
import cn from 'classnames';
import copy from 'copy-to-clipboard';
import LinkIcon from 'img/link.svg';

import css from './param.module.scss';

function Param({name, addId = true, id, type, definition, definitionValues, defaultValue, children} = {}) {
    const onClick = useCallback(() => {
        const {origin, pathname} = window.location;
        copy(`${origin}${pathname}?scrollTo=${id || name}`)
    }, [])

    return (
        <div className={css.el}>
            <div className={css.paramRow} id={addId ? id || name : undefined} onClick={addId ? onClick : undefined}>
                <div className={cn(css.paramName, {
                    [css.paramNameCopy]: addId
                })}>
                    {addId && <div className={css.linkIcon}>
                        <LinkIcon viewBox="0 0 32 32" width={16} height={16} />
                    </div>}
                    {name}
                </div>
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
