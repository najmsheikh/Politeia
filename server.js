var rekognition = require('rekognition');
var nameDB = require('./fire.js');
var OpenSecretsClient = require('opensecrets');
var client = new OpenSecretsClient('a2810bc194384a049f6a7fb646d897ad');

rekognition.config({
    api_key: "yRaOk6T9dONHHzvw",
    api_secret: "sgqKjcfFfNsHk4A9"
});

var image = 'http://i.huffpost.com/gen/1082266/images/o-STEVE-COHEN-TWITTER-facebook.jpg';

rekognition.faceDetect(image, function(err, body) {
    if (err)
        throw err;
    if (!err) {
        var nameList = JSON.parse(body).face_detection[0].name;
        var name = nameList.substring(0, nameList.indexOf(':'));
        name = name.replace('_', ' ');
        nameDB(name, function(cid) {
            client.candContrib(cid, function(err, json) {
                if (err) throw err;
                console.log('--------------'+name+'\'s Contributions------------');
                for (var i = 0; i < json['contributor'].length; i++) {
                    console.log(json['contributor'][i]['@attributes'].org_name);
                };
                process.exit();
            });
        });
    };
});

