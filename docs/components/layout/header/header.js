import React from 'react';
import Version from 'components/common/version';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import navItemsData from 'data/navItemsData';
import cn from 'classnames';
import {useRouter} from 'next/router';
import Language from 'components/language';

import css from './header.module.scss';
import useScroll from 'hooks/useScroll';

function Header({} = {}) {
    const {route} = useRouter();
    const {scrollTop} = useScroll();

    return (
        <div className={css.el}>
            <Container className={css.container}>
                <div className={css.logoAndVersion}>
                    <Link href={'/'}><a className={css.logo}>Air Datepicker</a></Link>
                    <Version className={css.version} />
                </div>
                <nav className={cn(css.nav, {
                    [css.navSticky]: scrollTop > 50
                })}>
                    {navItemsData.map(({labelId, href}) => {
                        let isActive = href === route;
                        return <Link href={href} key={labelId}>
                            <a
                                className={cn(css.navItem, {
                                    [css.navItemActive]: isActive
                                })}
                            >
                                <FormattedMessage id={labelId} />
                            </a>
                        </Link>
                    })}
                </nav>
                <Language className={css.lang} />
            </Container>
        </div>
    );
}

export default Header;
