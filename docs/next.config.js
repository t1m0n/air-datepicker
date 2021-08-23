const path = require('path');

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
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            include: path.resolve(__dirname, 'examples/locales/'),
            use: ['raw-loader']
        })

        return config;
    }
};
