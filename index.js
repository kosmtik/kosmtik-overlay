class Overlay {
    constructor(config) {
        config.addJS('/node_modules/kosmtik-overlay/front.js');
        config.on('project:tofront', this.patchConfig);    
    }

    patchConfig(e) {
        e.options.overlay = e.project.mml.overlay || this.userConfig.overlay || {};
        // Retrocompat
        if (e.project.mml.overlayUrl) e.options.overlay.url = e.project.mml.overlayUrl;
    };
}

exports = module.exports = { Plugin: Overlay }
