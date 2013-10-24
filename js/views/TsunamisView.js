App.Views.EarthquakesView = Backbone.View.extend({

    html: '<thead>' +
                '<tr>' +
                    '<th data-priority="persist">Location</th>' +
                    '<th data-priority="1">Country</th>' +
                    '<th data-priority="2">Cause</th>' +
                    '<th data-priority="3">Time</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>',

    tagName: 'table',
    className: 'ui-responsive table-stroke ui-table ui-table-reflow table-stripe',
    attributes: {
        'data-role': 'table'
    },

    events: {
        'click .plot-btn': 'plot'
    },

    views: null,

    // applied filter
    filter: null,

    initialize: function (options) {
        Backbone.View.prototype.initialize.call(this, options);
        this.views = [];
        App.EventBus.on('filter', _.bind(this.applyFilter, this));
    },

    render: function () {
        this.$el.html(this.html);
        this.$body = this.$el.find('tbody');
        this.collection.each(_.bind(this.addOne, this));
        return this;
    },

    applyFilter: function (options) {
        var fromDate = options.date && options.date.from && new Date(options.date.from),
            toDate = options.date && options.date.to && new Date(options.date.to),
            validityMax = options.validity && options.validity.max,
            validityMin = options.validity && options.validity.min,
            waterHeightMax = options.waterHeight && options.waterHeight.max,
            waterHeightMin = options.waterHeight && options.waterHeight.min,
            damageMax = options.damage && options.damage.max,
            damageMin = options.damage && options.damage.min;

        this.filter = options;

        // hide to prevent reflows
        this.$el.hide();

        _.each(this.views, function (view) {
            var show = true,
                model = view.model,
                date = model.get('date'),
                validity = model.get('eventValidity'),
                waterHeight = model.get('maximumWaterHeight'),
                damage = model.get('damageMillionsDollars');

            if(fromDate) {
                show = show && date >= fromDate;
            }
            if(toDate) {
                show = show && date <= toDate;
            }
            if(validityMin) {
                show = show && validity >= validityMin;
            }
            if(validityMax) {
                show = show && validity <= validityMax;
            }
            if(waterHeightMin) {
                show = show && waterHeight >= waterHeightMin;
            }
            if(waterHeightMax) {
                show = show && waterHeight <= waterHeightMax;
            }
            if(damageMin) {
                show = show && damage >= damageMin;
            }
            if(damageMax) {
                show = show && damage <= damageMax;
            }

            show ? view.show() : view.hide();
        });
        
        this.$el.show();
        this.plot();
    },

    shown: function () {
        // initialize jquery mobile widget
        this.$el.parent().trigger('create');
    },

    plot: function () {
        var me = this;
        OWF.ready(function() {
            OWF.Eventing.publish('map.feature.plot', JSON.stringify({
                featureId: 1,
                feature: me.toKML()
            }));
        });
    },

    addOne: function (model) {
        var view = new App.Views.EarthquakeView({
            model: model
        });
        this.views.push(view);
        this.$body.append(view.render().el);
    },

    toKML: function () {
        var modelKML = _.map(this.views, function(view) {
            return view.$el.is(':visible') ? view.model.toKML(): '';
        }).join('');

        return '<kml xmlns="http://www.opengis.net/kml/2.2">' + modelKML + '</kml>';
    }

});
