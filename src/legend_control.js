'use strict';

var LegendControl = L.Control.extend({

    options: {
        position: 'bottomright',
        sanitizer: require('./sanitize')
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._legends = {};
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'map-legends');
        L.DomEvent.disableClickPropagation(this._container);

        this._update();

        return this._container;
    },

    addLegend: function(text) {
        if (!text) { return this; }

        if (!this._legends[text]) {
            this._legends[text] = 0;
        }

        this._legends[text]++;
        return this._update();
    },

    removeLegend: function(text) {
        if (!text) { return this; }
        if (this._legends[text]) this._legends[text]--;
        return this._update();
    },

    _update: function() {
        if (!this._map) { return this; }

        this._container.innerHTML = '';

        for (var i in this._legends) {
            if (this._legends.hasOwnProperty(i) && this._legends[i]) {
                var div = this._container.appendChild(document.createElement('div'));
                div.className = 'map-legend';
                div.innerHTML = this.options.sanitizer(i);
            }
        }

        return this;
    }
});

module.exports = function(options) {
    return new LegendControl(options);
};
