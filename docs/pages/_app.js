import {withRouter} from 'next/router';
import React from 'react';
import {IntlProvider} from 'react-intl'

import 'air-datepicker/air-datepicker.css';
import 'public/global.css';
import 'public/typography.css';


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
        let {Component, pageProps, router: {locale, defaultLocale}} = this.props;

        if (!loaded) return null;
        return <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            <Component {...pageProps} />
        </IntlProvider>

    }
}

export default withRouter(MyApp);
