import React from 'react';
import AirDatepicker from 'components/airDatepicker';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';
import Button from 'components/common/button';

import css from './home.module.scss';

export default class Home extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className={css.el}>
                <Container>
                    <header className={css.promoHeader}>
                        <h1>Air Datepicker</h1>
                        <strong><FormattedMessage id={'promoNote'} /></strong>
                    </header>
                    <div className={css.dpHolder}>
                        <AirDatepicker dpClassName={css.dpPromo} />
                    </div>
                    <nav className={css.nav}>
                        <Button promo>Примеры</Button>
                        <Button promo>Документация</Button>
                        <Button promo>API</Button>
                    </nav>
                </Container>
            </div>
        );
    }
}
