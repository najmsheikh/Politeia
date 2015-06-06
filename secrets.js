// var OpenSecretsClient = require('opensecrets');
// var client = new OpenSecretsClient('***REMOVED***');

// client.candContrib('N00007360', function(err, json) {
//     if (err) throw err;
//     console.log('--------------Candidate Contributions------------');
//     for (var i = 0; i < json['contributor'].length; i++) {
//         console.log(json['contributor'][i]['@attributes'].org_name);
//     };
// });

var nameDB = require('./fire.js');

// nameDB('Ted Cruz').then(function(data) {
//    console.log(data);
// });

nameDB('Ted Cruz' , function(word){
	console.log(word);
});