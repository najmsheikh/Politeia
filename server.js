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

// var image = 'http://i.huffpost.com/gen/1082266/images/o-STEVE-COHEN-TWITTER-facebook.jpg';

// app.post('/lookup', function(req, res) {
//     var image = req.body.image;
//     rekognition.faceDetect(image, function(err, body) {
//         if (err)
//             throw err;
//         if (!err) {
//             var nameList = JSON.parse(body).face_detection[0].name;
//             var name = nameList.substring(0, nameList.indexOf(':'));
//             name = name.replace('_', ' ');
//             nameDB(name, function(cid) {
//                 client.candContrib(cid, function(err, json) {
//                     if (err) throw err;
//                     console.log('--------------' + name + '\'s Contributions------------');
//                     for (var i = 0; i < json['contributor'].length; i++) {
//                         console.log(json['contributor'][i]['@attributes'].org_name);
//                     };
//                 });
//             });
//         };
//     });
//     res.end();
// });

app.post('/enroll', function(req, res) {
    var img_url = req.body.img_url;
    var politician = req.body.politician;
    var json = {
            image: img_url,
            subject_id: politician,
            gallery_name: 'politica'
        };
    kairos.enroll(json);
    res.end();
});

app.post('/recognize', function(req, res){
    var img_url = req.body.img_url;
    var accuracy = req.body.threshold;
    var json = {
            url: img_url,
            gallery_name: 'politica',
            threshold: accuracy,
            max_num_results: 1
        };
    kairos.recognize(json, function(data){
        console.log(data);
    });
    res.end();
});

app.post('/lookup', function(req, res){
    var politician = req.body.politician;
    politician = politician.replace('-', ' ');
    nameDB(politician, function(data){
        console.log(data);
    });
    res.end();
});

app.listen(process.env.PORT, function() {
    console.log("Server is up  running at port: " + process.env.PORT);
});
