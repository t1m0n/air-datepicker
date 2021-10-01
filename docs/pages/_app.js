import {withRouter, useRouter} from 'next/router';
import Head from 'next/head';
import React, {useState, useEffect, useCallback} from 'react';
import {IntlProvider} from 'react-intl'
import Header from 'components/layout/header';
import {AppProvider} from 'context/appContext';

import '../../dist/air-datepicker.css';
import 'prismjs/themes/prism-coy.css'
import 'public/global.css';
import 'public/typography.css';
import 'public/dp-examples.css';
import 'public/prism-custom.css';


const MyApp = ({Component, pageProps}) => {
    let [loaded, setLoaded] = useState(false);
    let [loadingLocales, setLoadingLocales] = useState(false);
    let [messages, setMessages] = useState(false);
    let {route, locale, defaultLocale} = useRouter();

    useEffect(() => {
        async function init() {
            setLoadingLocales(true);

            let msgs = await loadMessages(locale);

            setMessages(msgs)
            setLoaded(true);
            setLoadingLocales(false);
        }
        init();
    }, [locale])

    async function loadMessages(locale) {
        let fetchedMessages;
        try {
            fetchedMessages = await import(`locales/${locale}`)
        } catch (e) {
            throw e
        }

        return fetchedMessages.default;
    }

    if (!loaded) return null;

    return <AppProvider value={{
        loadingLocales
    }}>
        <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            <Head>
                <title>Air Datepicker</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet" />
            </Head>
            {route !== '/home' ? <Header /> : ''}
            <Component {...pageProps} />
        </IntlProvider>
    </AppProvider>
}

export default MyApp;
