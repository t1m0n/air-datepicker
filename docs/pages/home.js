import React from 'react';
import AirDatepicker from 'components/airDatepicker';
import Container from 'components/layout/container';
import {FormattedMessage, useIntl} from 'react-intl';
import Button from 'components/common/button';
import Section from 'components/section';
import Code from 'components/code';
import {install, basicUsage} from 'examples/commonExamples';

import css from './home.module.scss';
import navItemsData from '../data/navItemsData';
import Link from 'next/link';
import cn from 'classnames';

export default function Home() {
    let {messages} = useIntl();

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
                    {navItemsData.map(({labelId, href}) => {
                        return <Button key={labelId} href={href} promo>
                            {messages[labelId]}
                        </Button>
                    })}
                </nav>
                <Section>
                    <FormattedMessage
                        tagName={'p'}
                        id={'promoNote2'}
                        values={{
                            airDatepicker: <strong>Air Datepicker</strong>,
                            size: <strong>13{messages.kilobyte}</strong>
                        }}
                    />
                    <FormattedMessage
                        tagName={'p'}
                        id={'promoNote3'}
                    />
                </Section>
                <Section title={'installTitle'}>
                    <Code language={'terminal'}>{install}</Code>
                </Section>
                <Section title={'usageTitle'}>
                    <FormattedMessage
                        tagName={'p'}
                        id={'usageNote'}
                    />
                    <Code>{basicUsage}</Code>
                </Section>
            </Container>
        </div>
    );
}
