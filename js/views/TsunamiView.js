App.Views.EarthquakeView = Backbone.View.extend({

    tagName: 'tr',

    tpl: _.template(
        '<th><%- day %>/<%- month %>/<%- year %></th>' +
        '<td><%- locationName %></td>' +
        '<td><%- country %></td>' +
        '<td><%- cause %></td>'
    ),

    render: function () {
        this.$el.html(this.tpl(this.model.toJSON()));
        return this;
    },

    show: function () {
        this.$el.show();
    },

    hide: function () {
        this.$el.hide();
    }

});
