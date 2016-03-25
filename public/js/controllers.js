'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

controller('AppCtrl', function($scope, $http) {

    $scope.cities = ["Barcelona", "Madrid", "Cuenca", "Valladolid", "Oslo"];
    $scope.city_selected = $scope.cities[0];

    $scope.changed = function() {
        loadTemp($scope.city_selected);
    }

    function loadTemp(city) {
        $scope.loaded = false;
        $http({
            method: 'GET',
            url: '/api/city?ciudad=' + city
        }).
        success(function(data, status, headers, config) {
            $scope.cityname = data.item.title;
            $scope.temp = data.item.condition.temp + "Cº";
            $scope.text = data.item.condition.text;
            $scope.code = data.item.condition.code;
            $scope.icongif="http://l.yimg.com/a/i/us/we/52/"+$scope.code+".gif";
            $scope.forecasts=data.item.forecast;
            
            $scope.loaded = true;

        }).
        error(function(data, status, headers, config) {
            $scope.name = 'Error!';
        });
    }

    loadTemp($scope.city_selected);


});