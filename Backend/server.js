var express = require('express');
var kairos = require('./kairos.js');
var bodyParser = require('body-parser');
var nameDB = require('./fire.js');
var OpenSecretsClient = require('opensecrets');
var client = new OpenSecretsClient('***REMOVED***');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.sendfile("./index.html");
});
app.get(/^(.+)$/, function(req, res) {
    res.sendfile(__dirname + req.params[0]);
});

app.post('/serve', function(req, res) {
    var img_url = req.body.img_url;
    var accuracy = 0.7;
    var json = {
        url: img_url,
        gallery_name: 'politica',
        threshold: accuracy,
        max_num_results: 1
    };
    kairos.recognize(json, function(data) {
        var politician = data.replace('-', ' ');
        nameDB(politician, function(cid) {
            client.candContrib(cid, function(err, json) {
                var organizations = [];
                if (err) throw err;
                for (var i = 0; i < json['contributor'].length; i++) {
                    organizations.push({
                        org: json['contributor'][i]['@attributes'].org_name
                    });
                };
                res.contentType('application/json');
                res.send(JSON.stringify(organizations));
                console.log(politician + ' contributors sent as JSON.')
            });
        });
    });
});

app.post('/enroll', function(req, res) {
    var img_url = req.body.img_url;
    var politician = req.body.politician;
    var json = {
        image: img_url,
        subject_id: politician,
        gallery_name: 'politica'
    };
    kairos.enroll(json, function(data) {
        console.log(politician + ' was enrolled.');
        res.send(data);
    });
    // res.end();
});

app.post('/recognize', function(req, res) {
    var img_url = req.body.img_url;
    var accuracy = req.body.threshold;
    var json = {
        url: img_url,
        gallery_name: 'politica',
        threshold: accuracy,
        max_num_results: 1
    };
    kairos.recognize(json, function(data) {
        console.log('Recognize used on ' + data);
        data = data.replace('-', ' ');
        res.send(normalizeName(data));
    });
    // res.end();
});

app.post('/lookup', function(req, res) {
    var politician = req.body.politician;
    politician = politician.replace('-', ' ');
    nameDB(politician, function(data) {
        console.log('Lookup used on ' + politician + ': ' + data);
        res.send(data);
    });
    // res.end();
});

////////HELPER METHODS//////////

function normalizeName(str) {
    var pieces = str.split(" ");
    for (var i = 0; i < pieces.length; i++) {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}

app.listen(process.env.PORT, function() {
    console.log("Server is up  running at port: " + process.env.PORT);
});
