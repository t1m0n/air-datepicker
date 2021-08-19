module.exports = (api) => {
    let presets = ['@babel/preset-env'];

    let plugins = [
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-private-methods', {loose: true}]
    ];

    api.cache.forever();

    return {
        presets,
        plugins,
    };
};
