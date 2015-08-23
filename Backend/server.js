var express = require('express');
var kairos = require('./kairos.js');
var bodyParser = require('body-parser');
var nameDB = require('./fire.js');
var discover = require('./discover.js');
var Votesmart = require('./votesmart.js');
var OpenSecretsClient = require('opensecrets');
var client = new OpenSecretsClient('***REMOVED***');
var votesmart = new Votesmart('***REMOVED***');

var app = express();
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        nameDB.getCID(politician, function(cid) {
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
        image: img_url,
        gallery_name: 'politica',
        threshold: accuracy,
        max_num_results: 1
    };
    kairos.recognize(json, function(data) {
        console.dir(data);
        // data = data.replace('-', ' ');
        // res.send(normalizeName(data));
        res.send(data);
    });
    // res.end();
});

app.post('/lookup', function(req, res) {
    var politician = req.body.politician;
    politician = politician.replace('-', ' ');
    nameDB.getCID(politician, function(data) {
        console.log('Lookup used on ' + politician + ': ' + data);
        res.send(data);
    });
    // res.end();
});

app.post('/listcands', function(req, res) {
    nameDB.listCandidates(function(politicians) {
        console.log(politicians);
        res.send(politicians);
    })
});

app.post('/discover', function(req, res) {
    var urls = [
        'https://feeds.feedburner.com/EducationWeekHighschools?format=xml',
        'http://feeds.reuters.com/reuters/topNews?format=xml'
    ];
    discover.getLinks(urls, function(data) {
        discover.getArticles(data, function(data) {
            res.send(JSON.parse(data));
        })
    })
});

app.post('/learn', function(req, res) {

})

app.post('/test', function(req, res) {
    // votesmart.candidateBio('55463', function(err, json){
    //     if (!err)
    //         res.send(json);
    // })
    votesmart.getStateOfficials('NY', function(err, json) {
        if (!err) {
            var list = [];
            for (var i = 0; i < json.candidateList.candidate.length; i++) {
                list.push({
                    candidateId: json.candidateList.candidate[i].candidateId,
                    firstName: json.candidateList.candidate[i].firstName,
                    middleName: json.candidateList.candidate[i].middleName,
                    nickName: json.candidateList.candidate[i].nickName,
                    preferredName: json.candidateList.candidate[i].preferredName,
                    lastName: json.candidateList.candidate[i].lastName,
                    officeName: json.candidateList.candidate[i].officeName
                })
            };
            res.send(list);
        }
    })
})

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
