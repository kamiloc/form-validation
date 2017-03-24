'use strict';

var PORT = process.env.PORT || 5000;

var express = require('express');
var app = express();
var folder = __dirname + '/public';

// expose public folder as static assets
app.use(express.static(folder));

// add our app routes
app.get('*', function(req, res) {

  if (req.url === '/' || req.url === '/home' ) {
     res.sendFile(folder+'/index.html');
  } else {
    res.sendFile(folder+'/404.html');
  }

});

const server = app.listen(PORT, function() {
  console.log('The Aplication is now listening at http://localhost:%s', PORT);
});