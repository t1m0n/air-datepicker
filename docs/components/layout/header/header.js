import React from 'react';
import PropTypes from 'prop-types';
import Version from 'components/common/version';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import navItemsData from 'data/navItemsData';
import cn from 'classnames';
import {useRouter} from 'next/router';
import Language from 'components/language';

import css from './header.module.scss';

function Header({} = {}) {
    let {route} = useRouter();

    return (
        <div className={css.el}>
            <Container className={css.container}>
                <div>
                    <Link href={'/'}><a className={css.logo}>Air Datepicker</a></Link>
                    <Version className={css.version} />
                </div>
                <nav className={css.nav}>
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
                <Language />
            </Container>
        </div>
    );
}

Header.propTypes = {};

export default Header;
