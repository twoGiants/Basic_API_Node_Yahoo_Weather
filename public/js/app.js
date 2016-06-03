'use strict';

require('angular');
require('angularjs-slider');
require('./../css/style.css');

var WeatherController = require('./weather.controller');

angular
    .module('myApp', [
        'rzModule'
    ]);

angular
    .module('myApp')
    .controller('WeatherController', WeatherController);

WeatherController.$inject = ['$http'];