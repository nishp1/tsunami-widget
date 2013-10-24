App.Views.EarthquakeView = Backbone.View.extend({

    tagName: 'tr',

    tpl: _.template(
        '<th><%- locationName %></th>' +
        '<td><%- country %></td>' +
        '<td><%- cause %></td>' +
        '<td><%- time %></td>'
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
