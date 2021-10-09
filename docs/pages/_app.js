import {withRouter, useRouter} from 'next/router';
import Head from 'next/head';
import React, {useState, useEffect, useCallback} from 'react';
import {IntlProvider} from 'react-intl'
import Header from 'components/layout/header';
import {AppProvider} from 'context/appContext';
import {baseName} from 'hooks/usePageTitle';
import enLocale from 'locales/en';
import ruLocale from 'locales/ru';

import '../../dist/air-datepicker.css';
import 'prismjs/themes/prism-coy.css'
import 'public/global.css';
import 'public/typography.css';
import 'public/dp-examples.css';
import 'public/prism-custom.css';

let localeMessages = {
    ru: ruLocale,
    en: enLocale
}

const MyApp = ({Component, pageProps}) => {
    let {route, locale, defaultLocale} = useRouter();
    let [loadingLocales, setLoadingLocales] = useState(false);
    let [messages, setMessages] = useState(localeMessages[locale] || enLocale);

    useEffect(() => {
        // Simulate localization loading for navBar update
        setLoadingLocales(true);

        setMessages(localeMessages[locale] || enLocale)

        setTimeout(() => {
            setLoadingLocales(false);
        })
    }, [locale])

    return <AppProvider value={{
        loadingLocales
    }}>
        <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            <Head>
                <title>{baseName}</title>
                <meta name='description' content={messages.promoNote} />
                <meta name='keywords' content={'datepicker, calendar, js calendar, plain js datepicker, timepicker, dependency free, lightweight, customizable'} />
                <meta property="og:title" content={baseName} />
                <meta property="og:type" content={'website'} />
                <meta property="og:description" content={messages.promoNote} />
                <meta property="twitter:title" content={baseName} />
                <meta property="twitter:description" content={messages.promoNote} />
                <meta property="twitter:type" content={'website'} />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet" />
            </Head>
            {route !== '/home' ? <Header /> : ''}
            <Component {...pageProps} />
        </IntlProvider>
    </AppProvider>
}

export default MyApp;
