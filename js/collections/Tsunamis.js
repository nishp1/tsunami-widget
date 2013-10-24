App.Collections.Tsunamis = Backbone.Collection.extend({

    model: App.Models.Tsunami,

    url: './js/tsevent.json',

    comparator: function (model) {
        return -model.get('date');
    }
    
});
