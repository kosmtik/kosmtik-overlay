var patchConfig = function (e) {
    e.options.overlay = e.project.mml.overlay || this.userConfig.overlay || {};
    // Retrocompat
    if (e.project.mml.overlayUrl) e.options.overlay.url = e.project.mml.overlayUrl;
};

exports.Plugin = function (config) {
    config.addJS('/node_modules/kosmtik-overlay/front.js');
    config.on('project:tofront', patchConfig);
};
