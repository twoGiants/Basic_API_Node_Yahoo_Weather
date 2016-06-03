'use strict';

angular
    .module('myApp.controllers', [])
    .controller('WeatherController', WeatherController);

function WeatherController($http) {
    var self = this;
    
    var allForecasts = {};
    
    self.forecastSlider = {
        value: 1,
        options: {
            id: 'slider-id',
            floor: 1,
            ceil: 9,
            showTicksValues: true,
            showSelectionBar: true,
            keyboardSupport: false,
            onChange: function() {
                selectForecasts();
            }
        }
    };
    
    self.search = search;
    
    search('Vienna');

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
        $http({
            method: 'GET',
            url: '/api/city?ciudad=' + city
        }).
        success(function (data, status, headers, config) {
            self.cityname = data.item.title;
            self.temp = data.item.condition.temp + "Cº";
            self.text = data.item.condition.text;
            self.code = data.item.condition.code;
            self.icongif = "http://l.yimg.com/a/i/us/we/52/" + self.code + ".gif";
            allForecasts = data.item.forecast;
            
            selectForecasts();

            self.loaded = true;

        }).
        error(function (data, status, headers, config) {
            self.name = 'Error!';
        });
    }
}

//function WeatherController($scope, $http) {
//
//    var allForecasts = {};
//    
//    $scope.forecastSlider = {
//        value: 1,
//        options: {
//            id: 'slider-id',
//            floor: 1,
//            ceil: 9,
//            showTicksValues: true,
//            showSelectionBar: true,
//            keyboardSupport: false,
//            onChange: function() {
//                selectForecasts();
//            }
//        }
//    };
//    
//    $scope.search = search;
//    
//    search('Vienna');
//
//    function selectForecasts() {
//        var tempForecastsArr = [];
//        
//        for (var i = 0; i <= $scope.forecastSlider.value; i++) {
//            tempForecastsArr[i] = allForecasts[i];
//        }
//        
//        $scope.forecasts = tempForecastsArr;
//    }
//    
//    function search(city) {
//        $scope.loaded = false;
//        getWeather(city);
//    }
//    
//    // refac into service
//    function getWeather(city) {
//        $http({
//            method: 'GET',
//            url: '/api/city?ciudad=' + city
//        }).
//        success(function (data, status, headers, config) {
//            $scope.cityname = data.item.title;
//            $scope.temp = data.item.condition.temp + "Cº";
//            $scope.text = data.item.condition.text;
//            $scope.code = data.item.condition.code;
//            $scope.icongif = "http://l.yimg.com/a/i/us/we/52/" + $scope.code + ".gif";
//            allForecasts = data.item.forecast;
//            
//            selectForecasts();
//
//            $scope.loaded = true;
//
//        }).
//        error(function (data, status, headers, config) {
//            $scope.name = 'Error!';
//        });
//    }
//}