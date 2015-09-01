var express = require('express');
var kairos = require('./kairos.js');
var bodyParser = require('body-parser');
var async = require('async');
var nameDB = require('./fire.js');
var discover = require('./discover.js');
var Votesmart = require('./votesmart.js');
var OpenSecretsClient = require('opensecrets');
var _ = require('underscore');
var Firebase = require('firebase');
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

app.post('/updateNews', function(req, res) {
    var top_stories = [
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&topic=n&output=rss',
        'http://feeds.reuters.com/reuters/topNews?format=xml'
    ];
    var education = [
        'http://www.ed.gov/feed',
        'http://www.usnews.com/rss/education'
    ]
    var climate_change = [
        'http://www.dailyclimate.org/feeds/topstories',
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&csid=e2c9bdd06b7eeef3&output=rss'
    ];
    var foreign_policy = [
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&csid=eb26f8615f76cd4f&output=rss',
        'http://www.worldaffairsjournal.org/headlines.xml'
    ];
    var topic = req.body.topic;
    var sources;
    var newsfb;
    switch (topic) {
        case 'top_stories':
            newsfb = new Firebase('https://politeianews.firebaseio.com/top_stories');
            sources = top_stories;
            break;
        case 'education':
            newsfb = new Firebase('https://politeianews.firebaseio.com/education');
            sources = education;
            break;
        case 'climate_change':
            newsfb = new Firebase('https://politeianews.firebaseio.com/climate_change');
            sources = climate_change;
            break;
        case 'foreign_policy':
            newsfb = new Firebase('https://politeianews.firebaseio.com/foreign_policy');
            sources = foreign_policy;
            break;
    }
    discover.getLinks(sources, function(data) {
        discover.getArticles(data, function(data) {
            var data = JSON.parse(data);
            var unique = _.uniq(data, false, function(item) {
                return item.title
            });
            newsfb.set(unique);
            // res.end();
            res.send(data);
        })
    })
})

app.post('/test', function(req, res) {
    // votesmart.candidateBio('135705', function(err, json){
    //     if (!err)
    //         res.send(json);
    // })
    // votesmart.getStateOfficials('NY', function(err, json) {
    //     if (!err) {
    //         var list = [];
    //         for (var i = 0; i < json.candidateList.candidate.length; i++) {
    //             if (json.candidateList.candidate[i].officeStatus == 'active') {
    //                 list.push(json.candidateList.candidate[i].candidateId)
    //             }
    //         };
    //         // for (var i = 0; i < list.length; i++) {
    //         //     list[i]
    //         // };
    //     }
    // })
    // var name = req.body.name;
    // votesmart.getByLastName(name, function(err, json) {
    //     var politician = [];
    //     politician.push({
    //         name: json.candidateList.candidate[0].preferredName + ' ' + json.candidateList.candidate[0].lastName,
    //         title: json.candidateList.candidate[0].title,
    //         party: json.candidateList.candidate[0].electionParties 
    //     })
    //     console.dir(politician[0]);
    //     res.send(politician[0]);
    // })
    var candfb = new Firebase('https://politica.firebaseio.com/candidates');
    votesmart.test('test', function(err, json) {
        candfb.set(null);
        // var candidates = json.stageCandidates.candidate;
        var candidates = json.candidateList.candidate;
        var list = [];
        for (var i = 0; i < candidates.length; i++) {
            (function(i) {
                var candidate = [];
                var id = candidates[i].candidateId;
                async.parallel([
                    function(callback) {
                        votesmart.getDetailedBio(id, function(err, json) {
                            if (!err && json.bio != undefined)
                                candidate.bio = json.bio;
                            callback();
                        });
                    },
                    function(callback) {
                        votesmart.getAddress(id, function(err, json) {
                            if (!err && json.address != undefined)
                                candidate.address = json.address.office;
                            callback();
                        });
                    },
                    function(callback) {
                        votesmart.getRating(id, function(err, json) {
                            if (!err && json.candidateRating != undefined)
                                candidate.ratings = json.candidateRating;
                            callback();
                        });
                    },
                    function(callback) {
                        votesmart.getVotes(id, function(err, json) {
                            if (!err && json.bills != undefined)
                                candidate.votes = json.bills;
                            callback();
                        })
                    },
                    function(callback) {
                        votesmart.getStances(id, function(err, json) {
                            if (!err && json.npat != undefined)
                                candidate.stances = json.npat;
                            callback();
                        })
                    }
                ], function() {
                    candfb.push(candidate);
                    // res.send(candidate);
                })
            })(i)
        };
        // res.send(list);
    })
})

app.post('/getCandidate', function(req, res) {
    var politician = req.body.name;
    // console.log(politician);
    votesmart.getByLastName(politician, function(err, json) {
        // res.send(json.candidateList.candidate[0].candidateId);
        var id = json.candidateList.candidate[0].candidateId;
        // console.log(id);
        votesmart.getDetailedBio(id, function(err, json) {
            res.send(json);
        })
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
