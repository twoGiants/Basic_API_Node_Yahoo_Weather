'use strict';
// dependencies
require('angular');
require('angularjs-slider');

// css
require('./../css/style.css');

// controllers
var WeatherController = require('./weather.controller');

// services
var weatherService = require('./weather.service');

// init
angular
    .module('myApp', [
        'rzModule'
    ]);

angular
    .module('myApp')
    .controller('WeatherController', WeatherController)
    .factory('weatherService', weatherService);

// conf
WeatherController.$inject = ['$log', 'weatherService'];
weatherService.$inject = ['$http', '$q', '$log'];