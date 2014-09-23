L.K.Map.addInitHook(function () {
    this.whenReady(function () {
        var container = L.DomUtil.create('div', 'overlay-container'),
            title = L.DomUtil.create('h3', '', container),
            params = {
                tms: false,
                zindex: 1000,
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                active: false,
                opacity: 0.5
            };
        title.innerHTML = 'Add an overlay';
        this.kosmtikOverlay = L.tileLayer(params.url, params);
        var builder = new L.K.FormBuilder(params, [
            ['active', {handler: 'CheckBox', helpText: 'Active'}],
            ['url', {helpText: 'URL template.'}],
            ['opacity', {handler: 'FloatInput', helpText: 'Opacity: from 0 to 1 (opaque).'}],
            ['tms', {handler: 'CheckBox', helpText: 'TMS format.'}]
        ]);
        builder.on('synced', function (e) {
            if (e.field === 'active') {
                if (params.active) this.kosmtikOverlay.addTo(this);
                else this.removeLayer(this.kosmtikOverlay);
            } else if (e.field === 'url') {
                this.kosmtikOverlay.setUrl(params.url);
            } else if (e.field === 'opacity') {
                this.kosmtikOverlay.setOpacity(params.opacity);
            }
        }, this);
        container.appendChild(builder.build());
        this.sidebar.addTab({
            label: 'Overlay',
            content: container
        });
        this.sidebar.rebuild();
    });
});
