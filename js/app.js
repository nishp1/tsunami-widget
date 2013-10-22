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

    $filterPanel.find('form').on('submit', function () {
        var data = $(this).serializeArray();
        data = _.zipObject(_.pluck(data, 'name'), _.pluck(data, 'value'));
        data.fromDate = data.fromDate.split('-').join('/');
        data.toDate = data.toDate.split('-').join('/');
        App.EventBus.trigger('filter', data);
        $filterPanel.panel('close');
        return false;
    });

})();


