var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');

var app = express();

var port = process.env.PORT || 8080

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true,                 // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true,        // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false,            // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use(express.static('build'))

var server = app.listen(port, function(){
  console.log('Express server running on port ' + port);
});

module.exports = {
  app: app,
  server: server
};