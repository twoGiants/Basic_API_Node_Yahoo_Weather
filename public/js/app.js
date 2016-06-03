'use strict';

require('angular');
require('angularjs-slider');
require('./../css/style.css');

var WeatherController = require('./weather.controller');
var weatherService = require('./weather.service');

angular
    .module('myApp', [
        'rzModule'
    ]);

angular
    .module('myApp')
    .controller('WeatherController', WeatherController)
    .factory('weatherService', weatherService);

WeatherController.$inject = ['$log', '$q', 'weatherService'];
weatherService.$inject = ['$http', '$q', '$log'];