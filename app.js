/**
 * Factory function that makes the server. 
 * 
 * @param quiet {boolean} if true will suppress all output.
 */
function makeServer(quiet) {
    var express    = require('express');
    var path       = require('path');
    var logger     = require('morgan');
    var bodyParser = require('body-parser');
    var routes     = require('./routes/index');
    var app        = express();

    if(!quiet) app.use(logger('common'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/', routes);

    var server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        if(!quiet) console.log('Server listening at port %s', port);
    });
    
    return server; 
}

module.exports = makeServer;
