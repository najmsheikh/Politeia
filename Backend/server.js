var express = require('express');
var kairos = require('./kairos.js');
var bodyParser = require('body-parser');
var async = require('async');
var nameDB = require('./fire.js');
var discover = require('./discover.js');
var Votesmart = require('./votesmart.js');
var nytimes = require('./nytimes.js');
var OpenSecretsClient = require('opensecrets');
var _ = require('underscore');
var Firebase = require('firebase');
var osclient = new OpenSecretsClient('***REMOVED***');
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
        gallery_name: 'politeia',
        threshold: accuracy,
        max_num_results: 1
    };
    kairos.recognize(json, function(data) {
        var politician = data.replace('-', ' ');
        nameDB.getCID(politician, function(cid) {
            osclient.candContrib(cid, function(err, json) {
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
        gallery_name: 'politeia'
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
        gallery_name: 'politeia',
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
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&csid=e2c9bdd06b7eeef3&output=rss',
        'http://www.dailyclimate.org/feeds/topstories'
    ];
    var foreign_policy = [
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&csid=eb26f8615f76cd4f&output=rss',
        'http://www.worldaffairsjournal.org/headlines.xml'
    ];
    var internet_privacy = [
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&q=internet+privacy&output=rss',
        'http://www.vogelitlawblog.com/articles/internet-privacy/feed/'
    ];
    var civil_rights = [
        'https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&q=civil+rights&output=rss',
        'http://www.thenewcivilrightsmovement.com/home.rss'
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
        case 'internet_privacy':
            newsfb = new Firebase('https://politeianews.firebaseio.com/internet_privacy');
            sources = internet_privacy;
            break;
        case 'civil_rights':
            newsfb = new Firebase('https://politeianews.firebaseio.com/civil_rights');
            sources = civil_rights;
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
    // var fname = req.body.fname;
    // var lname = req.body.lname;
    // nytimes.getFECID(lname, fname, function(id){
    //     nytimes.getFinance(id, function(data){
    //         res.send(JSON.parse(data));
    //     })
    // })
    // nytimes.getCommittee(fname, function(body) {
    //     res.send(body);
    // })
    // nytimes.getFinancials('N00001669', function(data) {
    //     res.send(data);
    // })
    var id = req.body.name
    votesmart.getDetailedBio(id, function(err, data) {
        res.send(data);
    })
})

app.post('/getCandidate', function(req, res) {
    // var politician = req.body.name;
    // votesmart.getByLastName(politician, function(err, json) {
    // res.send(json.candidateList.candidate[0].candidateId);
    // var id = json.candidateList.candidate[0].candidateId;
    var candfb = new Firebase('https://politeiacands.firebaseio.com/');
    var id = req.body.name;
    var cid;
    fnSeries = {
        bio: function(callback) {
            // TODO: Add Title
            votesmart.getDetailedBio(id, function(err, json) {
                if (!err && json.bio != undefined) {
                    cid = json.bio.candidate.crpId;
                    var fname = json.bio.candidate.preferredName;
                    var lname = json.bio.candidate.lastName;
                    var name = fname + ' ' + lname;
                    var home = json.bio.candidate.homeCity + ', ' + json.bio.candidate.homeState;
                    var education = [],
                        politicalxp = [],
                        professionalxp = [],
                        caucuses = [],
                        photo;
                    if (json.bio.candidate.photo.length < 1)
                        var photo = 'http://urcomped.com/content/images/NoProfileImage.png';
                    else
                        var photo = json.bio.candidate.photo;
                    if (json.bio.candidate.education.institution != undefined)
                        education = json.bio.candidate.education.institution;
                    else
                        education[0] = [json.bio.candidate.education];
                    if (json.bio.candidate.political.experience != undefined)
                        politicalxp = json.bio.candidate.political.experience;
                    else
                        politicalxp[0] = [json.bio.candidate.political];
                    if (json.bio.candidate.congMembership.experience != undefined)
                        caucuses = json.bio.candidate.congMembership.experience;
                    else
                        caucuses[0] = json.bio.candidate.congMembership;
                    if (json.bio.candidate.profession.experience != undefined)
                        professionalxp = json.bio.candidate.profession.experience;
                    else
                        professionalxp[0] = [json.bio.candidate.profession];
                    if (json.bio.office == undefined && json.bio.election != undefined)
                        var party = json.bio.election.parties;
                    else
                        var party = json.bio.office.parties;
                    if (json.bio.election != undefined)
                        var isCandidate = true;
                    else
                        var isCandidate = false;
                    if (json.bio.office != undefined)
                        var title = json.bio.office.title;
                    else
                        var title = '';
                    var bio = {
                        'id': json.bio.candidate.candidateId,
                        'crpId': json.bio.candidate.crpId,
                        'name': name,
                        'home': home,
                        'title': title,
                        'party': party,
                        'photo': photo,
                        'religion': json.bio.candidate.religion,
                        'birthPlace': json.bio.candidate.birthPlace,
                        'birthDate': json.bio.candidate.birthDate,
                        'family': json.bio.candidate.family,
                        'education': [education],
                        'politicalxp': [politicalxp],
                        'professionalxp': [professionalxp],
                        'caucuses': [caucuses],
                        'office': json.bio.office,
                        'isCandidate': isCandidate,
                        'election': json.bio.election
                    }
                }
                bio = removeExcessArray1(JSON.stringify(bio));
                bio = removeExcessArray2(bio);
                callback(null, JSON.parse(bio));
            });
        },
        contact: function(callback) {
            votesmart.getAddress(id, function(err, json) {
                if (!err && json.address != undefined) {
                    if (json.address.office.address == undefined)
                        var data = json.address.office[0];
                    else
                        var data = json.address.office
                    if (data.phone != undefined)
                        var phone = 'tel:' + data.phone.phone1;
                    else
                        var phone = 'tel:';
                    var address = 'http://maps.google.com/?q=' + data.address.street + ',' + data.address.city + ',' + data.address.state + ',' + data.address.zip;
                    if (phone.length < 5)
                        var hasPhone = false;
                    else
                        var hasPhone = true;
                    var contact = {
                        hasPhone: hasPhone,
                        phone: phone,
                        address: address
                    };
                }
                if (contact != undefined)
                    callback(null, contact);
                else
                    callback(null);
            });
        },
        ratings: function(callback) {
            // TODO: SLICE RATINGS FOR PERFORMANCE
            votesmart.getRating(id, function(err, json) {
                var limit;
                if (!err && json.candidateRating != undefined) {
                    var ratings = json.candidateRating.rating;
                    if (ratings.length > 20)
                        limit = 20;
                    else
                        limit = ratings.length;
                    ratings = ratings.slice(0, limit)
                }
                if (ratings != undefined)
                    callback(null, ratings);
                else
                    callback(null);
            });
        },
        votes: function(callback) {
            votesmart.getVotes(id, function(err, json) {
                if (!err && json.bills != undefined) {
                    var votes = [];
                    if (json.bills.bill.length > 20)
                        var limit = 20;
                    else
                        var limit = json.billTitle.bill.length;
                    for (var i = 0; i < limit; i++) {
                        var billNumber = json.bills.bill[i].billNumber;
                        var billTitle = json.bills.bill[i].title;
                        var office = json.bills.bill[i].office;
                        var stage = json.bills.bill[i].stage;
                        var vote;
                        if (json.bills.bill[i].vote == 'Y' || json.bills.bill[i].vote == 'C')
                            vote = 'YEA'
                        else if (json.bills.bill[i].vote == 'N')
                            vote = 'NAY'
                        else
                            vote = '-'
                        var bill = {
                            billNumber: billNumber,
                            billTitle: billTitle,
                            office: office,
                            stage: stage,
                            vote: vote
                        };
                        votes.push(bill);
                    };

                }
                if (votes != undefined)
                    callback(null, votes);
                else
                    callback(null);
            })
        },
        // stances: function(callback) {
        //     votesmart.getStances(id, function(err, json) {
        //         if (!err && json.npat != undefined) {
        //             var surveyMessage = json.npat.surveyMessage;
        //             var link = json.npat.generalinfo.linkBack;
        //         }
        //         callback(null, json);
        //     })
        // },
        financials: function(callback) {
            if (cid != undefined)
                nytimes.getFinancials(cid, function(data) {
                    callback(null, data);
                })
            else
                callback(null);
        }
    };

    async.series(fnSeries, function(err, results) {
        var politician = {};
        if (results.bio != undefined)
            politician.bio = results.bio;
        if (results.contact != undefined)
            politician.contact = results.contact;
        if (results.ratings != undefined)
            politician.ratings = results.ratings;
        if (results.votes != undefined)
            politician.votes = results.votes;
        if (results.stances != undefined)
            politician.stances = results.stances;
        if (results.financials != undefined)
            politician.financials = results.financials;
        // candfb.push(politician);
        res.send(politician);
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

function removeExcessArray1(json) {
    return json.replace(new RegExp(escapeRegExp('[['), 'g'), '[');
}

function removeExcessArray2(json) {
    return json.replace(new RegExp(escapeRegExp(']]'), 'g'), ']');
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

app.listen(process.env.PORT, function() {
    console.log("Server is up  running at port: " + process.env.PORT);
});
