L.K.Map.addInitHook(function () {
    this.whenReady(function () {
        var container = L.DomUtil.create('div', 'overlay-container'),
            title = L.DomUtil.create('h3', '', container),
            params = L.extend({
                tms: false,
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                active: false,
                opacity: 0.5,
                position: 1
            }, L.K.Config.project.overlay),
            self = this,
            updatePosition = function () {
                if (params.position === 1) self.kosmtikOverlay.bringToFront();
                else self.kosmtikOverlay.bringToBack();
            };
        title.innerHTML = 'Add an overlay';
        this.kosmtikOverlay = L.tileLayer(params.url, params);
        var builder = new L.K.FormBuilder(params, [
            ['active', {handler: L.K.Switch, label: 'Active (alt+ctrl+O)'}],
            ['tms', {handler: L.K.Switch, label: 'TMS format.'}],
            ['url', {helpText: 'URL template.'}],
            ['opacity', {handler: 'FloatInput', helpText: 'Opacity: from 0 to 1 (opaque).', min: 0, max: 1, step: 0.1}],
            ['position', {handler: 'IntSelect', helpText: 'Position regarding to project\'s map.', selectOptions: [[1, 'Above'], [-1, 'Below']]}]
        ]);
        var toggle = function () {
            if (params.active) {
                this.kosmtikOverlay.addTo(this);
                updatePosition();
            }
            else {
                this.removeLayer(this.kosmtikOverlay);
            }
        };
        builder.on('postsync', function (e) {
            if (e.helper.field === 'active') {
                toggle.call(this);
            } else if (e.helper.field === 'url') {
                this.kosmtikOverlay.setUrl(params.url);
            } else if (e.helper.field === 'opacity') {
                this.kosmtikOverlay.setOpacity(params.opacity);
            } else if (e.helper.field === 'position') {
                updatePosition();
            }
        }, this);
        container.appendChild(builder.build());
        this.sidebar.addTab({
            label: 'Overlay',
            content: container,
            className: 'overlay'
        });
        this.sidebar.rebuild();
        var toggleCallback = function () {
            params.active = !params.active;
            toggle.call(this);
            builder.fetchAll();
        };
        var editCallback = function () {
            this.sidebar.open('.overlay');
        };
        this.commands.add({
            keyCode: L.K.Keys.O,
            ctrlKey: true,
            altKey: true,
            callback: toggleCallback,
            context: this,
            name: 'Overlay: toggle'
        });
        this.commands.add({
            callback: editCallback,
            context: this,
            name: 'Overlay: configure'
        });
        if (params.active) toggle.call(this);
    });
});
