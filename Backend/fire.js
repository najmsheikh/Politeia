var firebase = require('firebase');
var fb = new firebase('https://politica.firebaseio.com/');

module.exports.getCID = function(politician, callback) {
    fb.once('value', function(snapshot) {
        var data = snapshot.val();
        data.forEach(function(dataSnap) {
            var index = politician.indexOf(' ');
            var first = politician.substring(0, index).capitalize();
            var last = politician.substring(index + 1).capitalize();
            var candidate = dataSnap.CRPName;
            if (candidate.indexOf(last) >= 0 && candidate.indexOf(first) >= 0)
                callback(dataSnap.CID);
        });
    });
};

module.exports.listCandidates = function(callback) {
    var politicians = [];
    fb.once('value', function(datasnap) {
        var data = datasnap.val();
        data.forEach(function(snap) {
            politicians.push({
                'name': snap.CRPName
            });
            console.log(snap.CRPName);
        })
    })
    console.log(JSON.stringify(politicians));
    callback(politicians);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
