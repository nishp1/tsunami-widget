App.Views.EarthquakesView = Backbone.View.extend({

    html: '<button class="btn plot-btn">Plot on Map</button>' +
        '<table class="table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Year</th>' +
                    '<th>Location</th>' +
                    '<th>Country</th>' +
                    '<th>Cause</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>' +
        '</table>',

    events: {
        'click .plot-btn': 'plot'
    },

    render: function () {
        this.$el.html(this.html);
        this.$body = this.$el.find('tbody');
        this.collection.each(_.bind(this.addOne, this));
        return this;
    },

    addOne: function (model) {
        var view = new App.Views.EarthquakeView({
            model: model
        });
        this.$body.append(view.render().el);
    },

    plot: function() {
        var collection = this.collection;

        OWF.ready(function() {
            OWF.Eventing.publish('map.feature.plot', JSON.stringify({
                featureId: 1,
                feature: collection.toKML()
            }));
        });
    }

});
