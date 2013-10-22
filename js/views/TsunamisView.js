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

    render: function () {
        this.$el.html(this.html);
        this.$body = this.$el.find('tbody');
        this.collection.each(_.bind(this.addOne, this));
        return this;
    },

    shown: function () {
        // initialize jquery mobile widget
        this.$el.parent().trigger('create');
    },

    addOne: function (model) {
        var view = new App.Views.EarthquakeView({
            model: model
        });
        this.$body.append(view.render().el);
    }

});
