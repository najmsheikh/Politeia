var request = require('request');

module.exports.enroll = function(json) {
    request({
        method: 'POST',
        url: 'https://api.kairos.com/enroll',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'app_id': '***REMOVED***',
            'app_key': '***REMOVED***'
        },
        body: json
    }, function(error, response, body) {
        if (body.images[0].transaction.status == 'success')
            console.log(json.subject_id + ' was enrolled.');
    });
};

module.exports.recognize = function(json, callback) {
    request({
        method: 'POST',
        url: 'https://api.kairos.com/recognize',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'app_id': '***REMOVED***',
            'app_key': '***REMOVED***'
        },
        body: json
    }, function(error, response, body) {
        if (body.images[0].transaction.status == 'success')
            callback(body.images[0].transaction.subject);
    });
}
