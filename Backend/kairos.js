var request = require('request');

module.exports.enroll = function(json, callback) {
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
            callback('success');
        else callback('failure');
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
        if (error)
            callback('Came back error');
        if (body.images[0].transaction.subject != 'undefined')
            callback(body.images[0].transaction.subject);
        else callback('N/A');
    });
}
