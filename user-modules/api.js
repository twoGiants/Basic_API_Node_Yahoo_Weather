'use strict';

var request = require('request');

// Serve JSON response from yahoo api to front end
exports.search = function (req, res) {
    // text from search field 
    var text = req.query.text;
    var locationQuery = encodeURI("select item from weather.forecast where woeid in (select woeid from geo.places where text='" + text + ", AT') and u='c'");
    var locationUrl = "http://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json";

    request(locationUrl, requestCb);
    
    function requestCb(error, response, body) {
        if (!error && response.statusCode == 200) {
            var weatherObj;
            weatherObj = JSON.parse(body);
            weatherObj = weatherObj.query.results.channel;
            
            // multiple results for 1 location query possible
            // only send back the first one
            if (weatherObj.constructor === Array) {
                weatherObj = weatherObj[0];
            }
            
            res.json(weatherObj);
        } else {
            console.log(error);
        }
    }
};