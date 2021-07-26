import {withRouter} from 'next/router';
import Head from 'next/head';
import React from 'react';
import {IntlProvider} from 'react-intl'
import Header from 'components/layout/header';

import 'air-datepicker/air-datepicker.css';
import 'prismjs/themes/prism-coy.css'
import 'public/global.css';
import 'public/typography.css';
import 'public/dp-examples.css';
import 'public/prism-custom.css';


class MyApp extends React.Component {

    state = {
        loaded: false
    }

    async componentDidMount() {
        let {router: {locale, defaultLocale}} = this.props;
        let messages = await import(`locales/${locale || defaultLocale}`);

        this.setState({
            loaded: true,
            messages: messages.default
        })
    }

    render() {
        let {loaded, messages} = this.state;
        let {Component, pageProps, router: {locale, defaultLocale, route}} = this.props;

        if (!loaded) return null;

        return <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet" />
                <script async defer src="https://buttons.github.io/buttons.js"></script>
            </Head>
            {route !== '/home' ? <Header /> : ''}
            <Component {...pageProps} />
        </IntlProvider>

    }
}

export default withRouter(MyApp);
