var request = require('request');
var async = require('async');
var apikey = '***REMOVED***';

module.exports.getFECID = function(lname, fname, callback) {
    var url = 'http://api.nytimes.com/svc/elections/us/v3/finances/2016/candidates/search.json?query=' + lname + '&api-key=' + apikey;
    request({
        url: url
    }, function(err, res, body) {
        if (!err) {
            var results = JSON.parse(body).results;
            for (var i = results.length - 1; i >= 0; i--) {
                if (results[i].candidate.name.indexOf(fname.toUpperCase()) > 0) {
                    console.log(results[i].candidate.id);
                    callback(results[i].candidate.id);
                    break;
                }
            };
        }
    })
}

module.exports.getFinance = function(id, callback) {
    // var url = 'http://api.nytimes.com/svc/elections/us/v3/finances/2016/candidates/' + id + '.json?api-key=' + apikey;
    var url = 'http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/' + id + '.json?api-key=' + apikey;
    request({
        url: url
    }, function(err, res, body) {
        if (!err) {
            callback(body)
        }
    })
}

module.exports.getCommittee = function(name, callback) {
    var url = 'http://api.nytimes.com/svc/elections/us/v3/finances/2016/committees/search.json?query=' + name + '&api-key=' + apikey;
    request({
        url: url
    }, function(err, res, body) {
        if (!err) {
            callback(JSON.parse(body));
        }
    })
}

module.exports.getFinancials = function(cid, callback) {
    async.parallel({
        summary: function(callback) {
            candSummary(cid, function(data) {
                callback(null, data);
            })
        },
        profile: function(callback) {
            memPFDprofile(cid, function(data) {
                callback(null, data);
            })
        },
        contribs: function(callback) {
        	candContrib(cid, function(data) {
        		callback(null, data);
        	})
        },
        industries: function(callback) {
        	candIndustry(cid, function(data) {
        		callback(null,data);
        	})
        }
    }, function(err, results) {
    	callback(results);
    })
}

function candContrib(cid, callback) {
    var url = 'https://www.opensecrets.org/api/?method=candContrib&cid=' + cid + '&apikey=***REMOVED***&output=json&cycle=2016';
    request({
        url: url
    }, function(err, res, body) {
        if (!err && body != 'Resource not found') {
            var contributors = JSON.parse(body).response.contributors.contributor;
            var organizations = [];
            for (var i = 0; i < contributors.length; i++) {
                organizations.push({
                    org: contributors[i]['@attributes'].org_name,
                    total: contributors[i]['@attributes'].total,
                    pacs: contributors[i]['@attributes'].pacs,
                    indivs: contributors[i]['@attributes'].indivs
                });
            };
            callback(organizations);
        } else {
            callback(null)
        }
    })
}

function candSummary(cid, callback) {
    var url = 'https://www.opensecrets.org/api/?method=candSummary&cid=' + cid + '&apikey=***REMOVED***&output=json&cycle=2016';
    request({
        url: url
    }, function(err, res, body) {
        if (!err && body != 'Resource not found') {
            var json = JSON.parse(body).response.summary['@attributes'];
            var data = {
                total: json.total,
                spent: json.spent,
                cash_on_hand: json.cash_on_hand,
                debt: json.debt
            };
            callback(data);
        } else {
            callback(null)
        }
    })
}

function candIndustry(cid, callback) {
    var url = 'https://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&apikey=***REMOVED***&output=json&cycle=2016';
    request({
        url: url
    }, function(err, res, body) {
        if (!err && body != 'Resource not found') {
            var json = JSON.parse(body).response.industries.industry;
            var industries = [];
            for (var i = 0; i < json.length; i++) {
                industries.push({
                    industry_name: json[i]['@attributes'].industry_name,
                    total: json[i]['@attributes'].total,
                    pacs: json[i]['@attributes'].pacs,
                    indivs: json[i]['@attributes'].indivs
                });
            };
            callback(industries);
        } else {
            callback(null)
        }
    })
}

function memPFDprofile(cid, callback) {
    var url = 'https://www.opensecrets.org/api/?method=memPFDprofile&cid=' + cid + '&apikey=***REMOVED***&output=json&cycle=2016';
    request({
        url: url
    }, function(err, res, body) {
        if (!err && body != 'Resource not found') {
            var profile = JSON.parse(body).response.member_profile;
            var data = {};
            var general = {
                net_low: profile['@attributes'].net_low,
                net_high: profile['@attributes'].net_high,
                asset_low: profile['@attributes'].asset_low,
                asset_high: profile['@attributes'].asset_high
            };
            data.general = general;
            if (profile.assets != undefined) {
                var assets = [];
                for (var i = 0; i < profile.assets.asset.length; i++) {
                    assets.push({
                        name: profile.assets.asset[i]['@attributes'].name
                    });
                };
                data.assets = assets;
            }
            if (profile.transactions != undefined) {
                var transactions = [];
                for (var i = 0; i < profile.transactions.transaction.length; i++) {
                    transactions.push({
                        asset_name: profile.transactions.transaction[i]['@attributes'].asset_name,
                        tx_date: profile.transactions.transaction[i]['@attributes'].tx_date,
                        tx_action: profile.transactions.transaction[i]['@attributes'].tx_action
                    });
                };
                data.transactions = transactions;
            }
            callback(JSON.parse(JSON.stringify(data)));
        } else {
            callback(null)
        }
    })
}
