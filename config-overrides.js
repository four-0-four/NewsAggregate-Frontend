module.exports = function override(config, env) {
    // Disables the error overlay
    if (config.plugins) {
        config.plugins = config.plugins.filter(
            plugin => plugin.constructor.name !== 'ErrorOverlayPlugin'
        );
    }

    return config;
};
