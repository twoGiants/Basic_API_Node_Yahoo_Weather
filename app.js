'use strict';

// dependencies
var express = require('express');
var api     = require('./user-modules/api');

// server
var app = express();

// conf
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 

// routing
app.get('/api/location', api.search);

// start app
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});