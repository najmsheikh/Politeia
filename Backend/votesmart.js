var qs = require('querystring'),
    request = require('request');

var VoteSmart = module.exports = function(apiKey) {
    if (!(this instanceof VoteSmart)) {
        return new VoteSmart(apiKey)
    }
    if (!apiKey) throw new Error('Must provide API Key');
    this.key = apiKey;
}

VoteSmart.prototype.makeRequest = function(method, params, callback) {
    // creates and executes an HTTP request
    if (typeof callback != 'function') {
        throw new Error('callback must be a function');
    }
    var options = this.createOptions(method, params, this.key);
    return this.executeRequest(options, callback);
};

VoteSmart.prototype.createOptions = function(method, params, key) {
    // generates the options for the http request from the method, params, and key
    var query = qs.stringify(params);

    return {
        url: 'http://api.votesmart.org/' + method + '?o=JSON&' + 'key=' + key + '&' + query,
        agent: false,
        headers: {
            "User-Agent": "Mozilla/4.0 (compatible; Project Vote Smart node.js client)",
            "Content-type": "application/x-www-form-urlencoded"
        }
    };
};

VoteSmart.prototype.executeRequest = function(options, callback) {
    // executes the HTTP request with the given options

    request(options, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            callback(new Error('Request failed with ' + res.statusCode));
        }
    });
};

VoteSmart.prototype.getBio = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('CandidateBio.getBio', params, callback);
};

VoteSmart.prototype.getDetailedBio = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('CandidateBio.getDetailedBio', params, callback);
};

VoteSmart.prototype.getAddress = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('Address.getCampaign', params, callback);
};

VoteSmart.prototype.getRating = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('Rating.getCandidateRating', params, callback);
};

VoteSmart.prototype.getVotes = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('Votes.getByOfficial', params, callback);
};

VoteSmart.prototype.getStances = function(id, callback) {
    var params = {
        candidateId: id
    };
    this.makeRequest('Npat.getNpat', params, callback);
};

VoteSmart.prototype.getStateOfficials = function(state, callback) {
  var params = {
    stateId: state
  };
  this.makeRequest('Officials.getStatewide', params, callback);
};

VoteSmart.prototype.getByLastName = function(lastName, callback, electionYear, stageId) {
    var params = {
        lastName: lastName
    };
    this.makeRequest('Candidates.getByLevenshtein', params, callback)
}

VoteSmart.prototype.test = function(data, callback){
    // var params = {
    //     electionId: '3128',
    //     stageId: 'G'
    // };
    var params = {
        zip5: '11001'
    };
    this.makeRequest('Officials.getByZip', params, callback);
}
