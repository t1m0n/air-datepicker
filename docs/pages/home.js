import React, {useEffect, useCallback} from 'react';
import AirDatepicker from 'components/airDatepicker';
import Container from 'components/layout/container';
import {FormattedMessage, useIntl} from 'react-intl';
import Button from 'components/common/button';
import Section from 'components/section';
import Code from 'components/code';
import {install, basicUsage} from 'examples/commonExamples';
import anime from 'animejs';

import css from './home.module.scss';
import navItemsData from '../data/navItemsData';
import Link from 'next/link';
import cn from 'classnames';

let adpArray = 'Air Datepicker'.split('');

export default function Home() {
    let {messages} = useIntl();

    useEffect(() => {
        let tl = anime.timeline({
            easing: 'easeInOutCubic',
            duration: 500,
        })
        let mainContentDelay = 700;

        tl
            .add({
                targets: `.${css.mainTitle} span`,
                duration: 800,
                opacity: 1,
                delay: anime.stagger(50, {from: 'center'})
            })
            .add({
                targets: [`.${css.dpPromo}`],
                duration: 1000,
                boxShadow: [
                    '0 20px 50px rgba(0, 0, 0, .1)',
                    '0 10px 14px rgba(0, 0, 0, .1)',
                ],
                translateY: [-12, 0],
                opacity: 1
            }, 0)
            .add({
                targets: `.${css.promoHeaderNote}`,
                opacity: 1
            }, mainContentDelay)
            .add({
                targets: `.${css.transition}`,
                opacity: 1,
            }, mainContentDelay)

    }, [])

    return (
        <div className={css.el}>
            <Container>
                <header className={css.promoHeader}>
                    <h1 className={cn(css.mainTitle)}>
                        {adpArray.map((letter, i) => {
                            return <span key={i}>{letter}</span>
                        })}
                    </h1>
                    <strong className={cn(css.promoHeaderNote)}>
                        <FormattedMessage id={'promoNote'} />
                    </strong>
                </header>
                <div className={css.dpHolder}>
                    <AirDatepicker dpClassName={cn(css.dpPromo)} inline />
                </div>
                <nav className={cn(css.nav, css.transition)}>
                    {navItemsData.map(({labelId, href}) => {
                        return <Button key={labelId} href={href} promo>
                            {messages[labelId]}
                        </Button>
                    })}
                </nav>
                <Section className={css.transition}>
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
                <Section className={css.transition} title={'installTitle'}>
                    <Code language={'terminal'}>{install}</Code>
                </Section>
                <Section className={css.transition} title={'usageTitle'}>
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
