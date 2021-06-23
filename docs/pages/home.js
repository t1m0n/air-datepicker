import React from 'react';
import AirDatepicker from 'components/airDatepicker';
import Container from 'components/layout/container';
import {FormattedMessage} from 'react-intl';
import Button from 'components/common/button';
import Section from 'components/section';
import Code from 'components/code';
import {install, basicUsage} from 'examples/commonExamples';

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
                        <AirDatepicker dpClassName={css.dpPromo} inline />
                    </div>
                    <nav className={css.nav}>
                        <Button promo href={'examples'}>Примеры</Button>
                        <Button promo href={'docs'}>Документация</Button>
                        <Button promo>API</Button>
                    </nav>
                    <Section>
                        Air Datepicker - современный js календарь, написанный на es6, с использованием нативных css переменных.
                        Занимает всего ~ <strong>13кб</strong> (минифицированный + gzip).
                        Работает во всех современных браузерах, поддерживающих css переменные. Легко кастомизируется, поддерживает навигацию с помощью клавиутуры и обладает удобным API.
                    </Section>
                    <Section title={'installTitle'}>
                        <Code language={'terminal'}>{install}</Code>
                    </Section>
                    <Section title={'usageTitle'}>
                        <Code>{basicUsage}</Code>
                    </Section>
                </Container>
            </div>
        );
    }
}
