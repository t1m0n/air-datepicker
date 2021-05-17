module.exports = {
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
        ];
    },
};
