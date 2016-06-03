'use strict';

module.exports = function WeatherController($log, $q, weatherService) {
    // def
    var self = this;
    var allForecasts = {};

    self.cityname = '';
    self.temp     = '';
    self.text     = '';
    self.code     = '';
    self.icongif  = '';
    self.loaded   = false;
    self.forecastSlider = {};
    self.search = search;

    // init
    initSlider();
    search('Vienna');

    ///////////////

    function initSlider() {
        // slider settings
        self.forecastSlider = {
            value: 1,
            options: {
                id: 'slider-id',
                floor: 1,
                ceil: 9,
                showTicksValues: true,
                showSelectionBar: true,
                keyboardSupport: false,
                onChange: selectForecasts
            }
        };
    }

    // forecasts to show, slider dependend
    function selectForecasts() {
        var tempForecastsArr = [];

        for (var i = 0; i <= self.forecastSlider.value; i++) {
            tempForecastsArr[i] = allForecasts[i];
        }

        self.forecasts = tempForecastsArr;
    }

    function search(city) {
        self.loaded = false;
        getWeather(city);
    }

    function getWeather(city) {
        var Promise = weatherService.getWeather(city);
        
        Promise.then(successCb, errorCb);
        
        function successCb(data) {
            self.cityname = data.item.title;
            self.temp = data.item.condition.temp + "Cº";
            self.text = data.item.condition.text;
            self.code = data.item.condition.code;
            self.icongif = "http://l.yimg.com/a/i/us/we/52/" + self.code + ".gif";
            allForecasts = data.item.forecast;
            selectForecasts();
            self.loaded = true;
        }
        
        function errorCb(err) {
            $log.log('Something went wrong: ' + err.data);
        }
    }
};