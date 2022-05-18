import React, {useCallback} from 'react';
import {useApp} from 'context/appContext';
import cn from 'classnames';

import css from './navToggle.module.scss';

function NavToggle({} = {}) {
    const {showNav, hideNav, navIsVisible} = useApp();

    const onClick = useCallback(() => {
        navIsVisible ? hideNav() : showNav();
    }, [navIsVisible])

    return (
        <div className={cn(css.el, {
            [css.active]: navIsVisible
        })} onClick={onClick}>
            <div className={cn(css.menuIcon, {
                [css.activeIcon]: !navIsVisible
            })}>
                <div className={css.item} />
                <div className={css.item} />
                <div className={css.item} />
            </div>
            <div className={cn(css.closeIcon, {
                [css.activeIcon]: navIsVisible
            })}>
                <div className={css.item} />
                <div className={css.item} />
            </div>
        </div>
    );
}

export default NavToggle;
