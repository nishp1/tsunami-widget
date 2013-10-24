(function() {
    try {
        var owfServerUrl = JSON.parse(window.name).preferenceLocation;

        owfServerUrl = owfServerUrl.split('prefs')[0] + 'js-min/owf-widget-debug.js';

        $.getScript(owfServerUrl, function() {
            OWF.ready(function() {
                App.onOWFReady();
                OWF.notifyWidgetReady();
            });
        });
    }
    catch (e) {
        console.warn("Could not initialize OWF APIs", e);
    }
})();
