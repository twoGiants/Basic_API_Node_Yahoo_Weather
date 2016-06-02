'use strict';

/*
 * Serve JSON response from yahoo api to our AngularJS client
 */
var request = require('request');
var weatherObj;

exports.city = function (req, res) {
    var city = req.query.ciudad;
    var locationQuery = encodeURI("select item from weather.forecast where woeid in (select woeid from geo.places where text='" + city + ", ES') and u='c'"),
        locationUrl = "http://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json";

    request(locationUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            weatherObj = JSON.parse(body);
            weatherObj = weatherObj.query.results.channel;
            if (weatherObj.constructor === Array) {
                weatherObj = weatherObj[0];
            }
            res.json(weatherObj);
        }
    });

};