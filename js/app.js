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

})();


