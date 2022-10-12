module.exports = (api) => {
    let presets = ['@babel/preset-env'];

    let plugins = [
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-private-methods']
    ];

    api.cache.forever();

    return {
        presets,
        plugins,
    };
};
