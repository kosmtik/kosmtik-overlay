L.K.Map.addInitHook(function () {
    this.whenReady(function () {
        var container = L.DomUtil.create('div', 'overlay-container'),
            title = L.DomUtil.create('h3', '', container),
            params = {
                tms: false,
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                active: false,
                opacity: 0.5,
                position: 1
            },
            self = this,
            updatePosition = function () {
                if (params.position === 1) self.kosmtikOverlay.bringToFront();
                else self.kosmtikOverlay.bringToBack();
            };
        title.innerHTML = 'Add an overlay';
        this.kosmtikOverlay = L.tileLayer(params.url, params);
        var builder = new L.K.FormBuilder(params, [
            ['active', {handler: L.K.Switch, label: 'Active'}],
            ['tms', {handler: L.K.Switch, label: 'TMS format.'}],
            ['url', {helpText: 'URL template.'}],
            ['opacity', {handler: 'FloatInput', helpText: 'Opacity: from 0 to 1 (opaque).'}],
            ['position', {handler: 'IntSelect', helpText: 'Position regarding to project\'s map.', selectOptions: [[1, 'Above'], [-1, 'Below']]}],
        ]);
        builder.on('synced', function (e) {
            if (e.field === 'active') {
                if (params.active) {
                    this.kosmtikOverlay.addTo(this);
                    updatePosition();
                }
                else {
                    this.removeLayer(this.kosmtikOverlay);
                }
            } else if (e.field === 'url') {
                this.kosmtikOverlay.setUrl(params.url);
            } else if (e.field === 'opacity') {
                this.kosmtikOverlay.setOpacity(params.opacity);
            } else if (e.field === 'position') {
                updatePosition();
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
