App.Views.EarthquakeView = Backbone.View.extend({

    tagName: 'tr',

    tpl: _.template(
        '<td><%- year %></td>' +
        '<td><%- locationName %></td>' +
        '<td><%- country %></td>' +
        '<td><%- cause %></td>'
    ),

    render: function () {
        this.$el.html(this.tpl(this.model.toJSON()));
        return this;
    }
});
