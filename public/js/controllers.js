'use strict';

/* Controllers */

angular
    .module('myApp.controllers', [])
    .controller('WeatherController', WeatherController);

function WeatherController($scope, $http) {

    var allForecasts = {};
    
    $scope.cities = ["Vienna", "Salzburg", "Graz", "Linz"];
    $scope.city_selected = $scope.cities[0];

    $scope.forecastSlider = {
        value: 0,
        options: {
            id: 'slider-id',
            floor: 0,
            ceil: 9,
            showTicksValues: true,
            showSelectionBar: true,
            onChange: function() {
                selectForecasts();
            }
        }
    };
    
    $scope.changed = function () {
        loadTemp($scope.city_selected);
    };
    
    loadTemp($scope.city_selected);

    function loadTemp(city) {
        $scope.loaded = false;
        $http({
            method: 'GET',
            url: '/api/city?ciudad=' + city
        }).
        success(function (data, status, headers, config) {
            $scope.cityname = data.item.title;
            $scope.temp = data.item.condition.temp + "Cº";
            $scope.text = data.item.condition.text;
            $scope.code = data.item.condition.code;
            $scope.icongif = "http://l.yimg.com/a/i/us/we/52/" + $scope.code + ".gif";
            allForecasts = data.item.forecast;
            
            selectForecasts();

            $scope.loaded = true;

        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });
    }

    function selectForecasts() {
        var tempForecastsArr = [];
        
        for (var i = 0; i <= $scope.forecastSlider.value; i++) {
            tempForecastsArr[i] = allForecasts[i];
        }
        
        $scope.forecasts = tempForecastsArr;
    }
}

    
    
    
    
    
    
    
    
    
    
    
    
    
