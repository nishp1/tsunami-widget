App.Collections.Tsunamis = Backbone.Collection.extend({

    model: App.Models.Tsunami,

    url: './js/tsevent.json',

    kmlTmpl: _.template('<kml xmlns="http://www.opengis.net/kml/2.2"><%= content %></kml>'),

    comparator: function (model) {
        return -model.get('date');
    },

    toKML: function() {
        var modelKml = this.map(function(model) {
            return model.toKML();
        }).join('');

        return this.kmlTmpl({content: modelKml});
    }
});
