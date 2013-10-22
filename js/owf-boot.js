(function() {
    try {
        var owfServerUrl = JSON.parse(window.name).preferenceLocation;

        owfServerUrl = owfServerUrl.split('prefs')[0] + 'js-min/owf-widget-debug.js';

        var owfScriptEl = $('<script src="' + owfServerUrl + '" ></script>');

        owfScriptEl.appendTo($('head'));
    }
    catch (e) {
        console.warn("Could not initialize OWF APIs", e);
    }
})();
