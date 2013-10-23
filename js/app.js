;(function () {
    var earthquakes = new App.Collections.Tsunamis();

    earthquakes.fetch().done(function () {
        var view = new App.Views.EarthquakesView({
            collection: earthquakes
        });
        view.render().$el.appendTo('.container');
        view.shown();
    });

    var $filterPanel = $('#filter-panel').on('swipeleft', function (evt) {
        if(evt.target !== $filterPanel[0]) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            evt.stopPropagation();
        }
    });

    $filterPanel.on('slidestop', function () {
        var data = $(this).serializeArray();
        data = _.zipObject(_.pluck(data, 'name'), _.pluck(data, 'value'));
        data = {
            validity: {
                min: parseInt(data['validity-min'], 10),
                max: parseInt(data['validity-max'], 10)
            },
            waterHeight: {
                min: parseInt(data['water-height-min'], 10),
                max: parseInt(data['water-height-max'], 10) 
            },
            damage: {
                min: parseInt(data['damage-min'], 10),
                max: parseInt(data['damage-max'], 10) 
            }
        };
        App.EventBus.trigger('filter', data);
        return false;
    });

})();


