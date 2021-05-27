import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import navItemsData from 'data/navItemsData';
import cn from 'classnames';
import {useRouter} from 'next/router';

import css from './header.module.scss';

function Header({} = {}) {
    let {route} = useRouter();

    return (
        <div className={css.el}>
            <Container>
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
            </Container>
        </div>
    );
}

Header.propTypes = {};

export default Header;
