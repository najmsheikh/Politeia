var request = require('request');

module.exports.enroll = function(json) {
    request({
        method: 'POST',
        url: 'https://api.kairos.com/enroll',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'app_id': '011ab8ee',
            'app_key': '31b0f5505b524cc52ad17b8ca3cb312d'
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
            'app_id': '011ab8ee',
            'app_key': '31b0f5505b524cc52ad17b8ca3cb312d'
        },
        body: json
    }, function(error, response, body) {
        if (body.images[0].transaction.subject != 'undefined')
            callback(body.images[0].transaction.subject);
        else callback('N/A');
    });
}
