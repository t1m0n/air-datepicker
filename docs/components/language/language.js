import React from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'components/common/link';
import PropTypes from 'prop-types';

let items = [
    {
        label: 'Русский',
        icon: 'ru.svg',
        locale: 'ru'
    },
    {
        label: 'English',
        icon: 'gb.svg',
        locale: 'en'
    }
]


import css from './language.module.scss';

function Language({} = {}) {
    let router = useRouter();

    return (
        <div className={css.el}>
            {items.map(({label, icon, locale}) => {
                return <a
                    className={css.item}
                    key={locale}
                    href={`/${locale}`}
                >
                    {label}
                </a>
            })}
        </div>
    );
}

Language.propTypes = {};

export default Language;
