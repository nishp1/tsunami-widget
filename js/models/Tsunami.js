App.Models.Tsunami = Backbone.Model.extend({
    
    // "id": "5491",
    // "year": "2013",
    // "month": "7",
    // "day": "21",
    // "hour": "5",
    // "minute": "9",
    // "second": "31.3",
    // "eventValidity": "4",
    // "causeCode": "1",
    // "focalDepth": "14",
    // "primaryMagnitude": "6.5",
    // "country": "NEW ZEALAND",
    // "state": "",
    // "locationName": "COOK STRAIT",
    // "latitude": "-41.713",
    // "longitude": "174.443",
    // "regionCode": "81",
    // "maximumWaterHeight": "",
    // "abe": "",
    // "iida": "",
    // "soloviev": "",
    // "warningStatus": "",
    // "deaths": "",
    // "deathsDescription": "",
    // "missing": "",
    // "missingDescription": "",
    // "injuries": "",
    // "injuriesDescription": "",
    // "damageMillionsDollars": "",
    // "damageDescription": "",
    // "housesDestroyed": "",
    // "housesDestroyedDescription": "",
    // "housesDamaged": "",
    // "housesDamagedDescription": "",
    // "totalDeaths": "",
    // "totalDeathsDescription": "",
    // "totalMissing": "",
    // "totalMissingDescription": "",
    // "totalInjuries": "",
    // "totalInjuriesDescription": "",
    // "totalDamageMillionsDollars": "",
    // "totalDamageDescription": "",
    // "totalHousesDestroyed": "",
    // "totalHousesDestroyedDescription": "",
    // "totalHousesDamaged": "",
    // "totalHousesDamagedDescription": ""

    causeCodes: {
        '0': 'Unknown',
        '1': 'Earthquake',
        '2': 'Questionable Earthquake',
        '3': 'Earthquake and Landslide',
        '4': 'Volcano and Earthquake',
        '5': 'Volcano, Earthquake, and Landslide',
        '6': 'Volcano',
        '7': 'Volcano and Landslide',
        '8': 'Landslide',
        '9': 'Meteorological',
        '10': 'Explosion',
        '11': 'Astronomical Tide'
    },

    parse: function (resp) {
        resp.cause = this.causeCodes[resp.causeCode];
        resp.damageMillionsDollars = parseInt(resp.damageMillionsDollars, 10) || 0;

        var intKeys = ['eventValidity', 'maximumWaterHeight', 'year', 'month', 'day', 'hour', 'minute', 'second'];
        _.each(intKeys, function (key) {
            resp[key] = parseInt(resp[key], 10) || 0;
        });

        resp.date = new Date(resp.year, resp.month, resp.day);
        resp.time = new Date(resp.year, resp.month, resp.day, resp.hour, resp.minute, resp.second);
        
        return resp;
    },

    kmlTmpl: _.template('<Placemark>' +
        '<name><%- locationName %> - <%- time %></name>' +
        '<Style>' +
            '<IconStyle>' +
                '<Icon>' +
                    '<href>images/red-circle.png</href>' +
                '</Icon>' +
                '<hotSpot x="0.5" y="0" xunits="fraction" yunits="fraction"></hotSpot>' +
            '</IconStyle>' +
        '</Style>' +
        '<Point>' +
            '<coordinates><%- longitude %>,<%- latitude %></coordinates>' +
        '</Point>' +
        '<LookAt>' +
            '<longitude><%- longitude %></longitude>' +
            '<latitude><%- latitude %></latitude>' +
        '</LookAt>' +
    '</Placemark>'),

    toKML: function() {
        return this.kmlTmpl(this.toJSON());
    },

    toJSON: function() {
        return _.extend(Backbone.Model.prototype.toJSON.apply(this), {
            time: this.get('time').toUTCString()
        });
    }
});