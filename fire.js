var firebase = require('firebase');
var fb = new firebase('https://politica.firebaseio.com/');

module.exports = function(politician, callback) {
    fb.once('value', function(snapshot) {
        var data = snapshot.val();
        data.forEach(function(dataSnap) {
            var index = politician.indexOf(' ');
            var first = politician.substring(0,index).capitalize();
            var last = politician.substring(index+1).capitalize();
            var candidate = dataSnap.Name;
            if (candidate.indexOf(last) >= 0 && candidate.indexOf(first) >= 0)
                callback(dataSnap.CID);
        });
    });
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
