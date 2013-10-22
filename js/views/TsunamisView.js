App.Views.EarthquakesView = Backbone.View.extend({

    html: '<thead>' +
                '<tr>' +
                    '<th data-priority="1">Date</th>' +
                    '<th data-priority="persist">Location</th>' +
                    '<th data-priority="2">Country</th>' +
                    '<th data-priority="3">Cause</th>' +
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
        var fromDate = options.fromDate && new Date(options.fromDate),
            toDate = options.toDate && new Date(options.toDate),
            validityMax = parseInt(options.validityMax, 10),
            validityMin = parseInt(options.validityMin, 10),
            waterHeightMax = parseInt(options.waterHeightMax, 10),
            waterHeightMin = parseInt(options.waterHeightMin, 10);

        _.each(this.views, function (view) {
            var show = true,
                model = view.model,
                date = model.get('date'),
                validity = model.get('eventValidity'),
                waterHeight = model.get('maximumWaterHeight');

            if(fromDate) {
                show = show && date > fromDate;
            }
            if(toDate) {
                show = show && date < toDate;
            }

            show = (validity >= validityMin && validity <= validityMax)
                    && (waterHeight >= waterHeightMin && waterHeight <= waterHeightMax);


            show ? view.show() : view.hide();
        });
    },

    shown: function () {
        // initialize jquery mobile widget
        this.$el.parent().trigger('create');
    },

    addOne: function (model) {
        var view = new App.Views.EarthquakeView({
            model: model
        });
        this.views.push(view);
        this.$body.append(view.render().el);
    }

});
