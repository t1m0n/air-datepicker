import React from 'react';
import AirDatepicker from 'components/airDatepicker';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';

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
                        <AirDatepicker />
                    </div>
                </Container>
            </div>
        );
    }
}
