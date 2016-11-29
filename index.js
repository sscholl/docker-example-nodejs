var _ = require('lodash');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

if (fs.existsSync('privatekey.key') && fs.existsSync('certificate.crt')) {
    var privateKey = fs.readFileSync( 'privatekey.key' );
    var certificate = fs.readFileSync( 'certificate.crt' );
}

app.use(bodyParser.urlencoded({
    extended: true
}))
if (privateKey && certificate)  var port = 5443;
else                            var port = 5000;
app.set('port', (process.env.PORT || port))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.send("Hello!");
});


if (privateKey && certificate) {
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'))
    })
} else {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'))
    })
}
