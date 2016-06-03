'use strict';

module.exports = function WeatherController($http) {
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

    // refac into service
    function getWeather(city) {
        var httpSettings = {
            method: 'GET',
            url: '/api/city?ciudad=' + city
        };

        $http(httpSettings)
            .success(successCb)
            .error(errorCb);

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
            self.name = 'Error!';
            console.log('Server Error: ' + err.data);
        }
    }
};

//angular
//    .module('myApp.controllers', [])
//    .controller('WeatherController', WeatherController);
//
//function WeatherController($http) {
//    // def
//    var self = this;
//    var allForecasts = {};
//
//    self.cityname = '';
//    self.temp     = '';
//    self.text     = '';
//    self.code     = '';
//    self.icongif  = '';
//    self.loaded   = false;
//    self.forecastSlider = {};
//    self.search = search;
//
//    // init
//    initSlider();
//    search('Vienna');
//
//    ///////////////
//
//    function initSlider() {
//        // slider settings
//        self.forecastSlider = {
//            value: 1,
//            options: {
//                id: 'slider-id',
//                floor: 1,
//                ceil: 9,
//                showTicksValues: true,
//                showSelectionBar: true,
//                keyboardSupport: false,
//                onChange: selectForecasts
//            }
//        };
//    }
//
//    // forecasts to show, slider dependend
//    function selectForecasts() {
//        var tempForecastsArr = [];
//
//        for (var i = 0; i <= self.forecastSlider.value; i++) {
//            tempForecastsArr[i] = allForecasts[i];
//        }
//
//        self.forecasts = tempForecastsArr;
//    }
//
//    function search(city) {
//        self.loaded = false;
//        getWeather(city);
//    }
//
//    // refac into service
//    function getWeather(city) {
//        var httpSettings = {
//            method: 'GET',
//            url: '/api/city?ciudad=' + city
//        };
//
//        $http(httpSettings)
//            .success(successCb)
//            .error(errorCb);
//
//        function successCb(data) {
//            self.cityname = data.item.title;
//            self.temp = data.item.condition.temp + "Cº";
//            self.text = data.item.condition.text;
//            self.code = data.item.condition.code;
//            self.icongif = "http://l.yimg.com/a/i/us/we/52/" + self.code + ".gif";
//            allForecasts = data.item.forecast;
//
//            selectForecasts();
//
//            self.loaded = true;
//        }
//
//        function errorCb(err) {
//            self.name = 'Error!';
//            console.log('Server Error: ' + err.data);
//        }
//    }
//}