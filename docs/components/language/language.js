import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'components/common/link';
import PropTypes from 'prop-types';
import Ru from 'img/flags/ru.svg';
import En from 'img/flags/gb.svg';
import Button from 'components/common/button';
import cn from 'classnames';
import {closest} from 'utils';

let items = {
    en: {
        label: 'English',
        Icon: En
    },
    ru: {
        label: 'Русский',
        Icon: Ru
    }
}

import css from './language.module.scss';

function Language({} = {}) {
    let {locale, locales} = useRouter();
    let [isActive, setIsActive] = useState(false);

    useEffect(() => {
        window.addEventListener('click', onClickWindow)
        return () => {
            window.removeEventListener('click', onClickWindow)
        }
    }, [])

    let activeLang = useMemo(() => {
        return items[locale];
    }, [locale]);

    let onClickToggle = useCallback(() => {
        setIsActive(!isActive);
    }, [isActive])

    let closeMenu = useCallback(() => {
        setIsActive(false);
    }, []);

    let onClickWindow = useCallback((e) => {
        console.log('click');
        if (!closest(e.target, `.${css.el}`)) {
            closeMenu();
        }
    }, []);

    return (
        <div className={css.el}>
            <Button
                size={'s'}
                onClick={onClickToggle}
                className={css.toggle}
                active={isActive}
                bordered={false}
            >
                <activeLang.Icon width={16} /> {activeLang.label}
            </Button>
            <div
                className={cn(css.menu, {
                    [css.menuActive]: isActive
                })}
            >
                {locales.map(l => {
                    let item = items[l];
                    if (!item) return null;

                    return <div className={cn(css.menuItem)} key={l}>
                        <span className={css.flagHolder}>
                            <item.Icon width={16} />
                        </span>
                        {item.label}
                    </div>
                })}
            </div>
        </div>
    );
}

Language.propTypes = {};

export default Language;
