'use strict';

var express = require('express');
var api     = require('./routes/api');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 

// JSON API
app.get('/api/city', api.city);

// Start server
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});