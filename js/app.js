var earthquakes = new App.Collections.Tsunamis();

earthquakes.fetch({ sort: true }).done(function () {
    new App.Views.EarthquakesView({
        collection: earthquakes
    }).render().$el.appendTo('.container');
});
