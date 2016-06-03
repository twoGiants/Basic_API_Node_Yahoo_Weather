'use strict';

module.exports = function ($http, $q, $log) {
    var service = {
        getWeather: getWeather
    };
    
    return service;
    
    /////////////
    
    function getWeather(location) {
        
        return $q(promiseFn);
        
        function promiseFn(resolve, reject) {
            var httpSettings = {
                method: 'GET',
                url: '/api/city?ciudad=' + location
            };

            $http(httpSettings)
                .success(successCb)
                .error(errorCb);

            function successCb(data) {
                resolve(data);
            }

            function errorCb(err) {
                reject(err);
                $log.log('Server Error: ' + err.data);
            }
        }
    }
};