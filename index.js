var patchConfig = function (e) {
    e.options.overlayUrl = e.project.mml.overlayUrl || this.userConfig.overlayUrl || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
};

exports.Plugin = function (config) {
    config.addJS('/node_modules/kosmtik-overlay/front.js');
    config.on('project:tofront', patchConfig);
};
