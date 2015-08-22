var feed = require('feed-read');
var async = require('async');
var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
    application_id: "***REMOVED***",
    application_key: "***REMOVED***"
});

 // TAKES A LIST OF ARTICLE URLS AND GIVES BACK FINAL JSON ARRAY OF ARTICLES
module.exports.getArticles = function(urls, callback) {
    var data = [];
    async.each(urls, function(url, callback) {
        getArticle(url, function(article) {
            data.push(JSON.parse(article));
            callback();
        });
    }, function(err) {
        fixArticles(data, function(data) {
            callback(data);
        })
    })
}


 // TAKES A URL AND RETURNS ARTICLE
function getArticle(url, callback) {
    var article = [];
    var sentences;
    var title;
    var link;
    var image;
    async.parallel([
        function(callback) {
            getArticleData(url, function(data) {
                // article.push(data);
                newdata = JSON.parse(data);
                title = newdata[0].title;
                link = newdata[0].link;
                image = newdata[0].image;
                // console.dir(newdata);
                callback();
            });
        },
        function(callback) {
            shortenArticle(url, function(data) {
                // article.push({
                // 	sentences: JSON.parse(data)
                // });
                // console.dir(data);
                sentences = JSON.parse(data);
                callback();
            });
        }
    ], function() {
        article.push({
            title: title,
            link: link,
            image: image,
            sentences: sentences
        })
        callback(JSON.stringify(article));
    });
}

 // TAKES LIST OF RSS FEEDS AND RETURNS ARTICLE URLS FROM EACH
module.exports.getLinks = function(urls, callback) {
    var data = [];
    async.each(urls, function(item, callback) {
        feed(item, function(err, articles) {
            if (err) throw err;
            data.push(articles);
            callback();
        });
    }, function(err) {
        fixArticles(data, function(data) {
            var links = [];
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                links.push(data[i].link);
            };
            callback(links);
        });
    })
}

 // TAKES ARTICLE URL AND SUMMARIZES IT
function shortenArticle(url, callback) {
    var sents = [];
    textapi.summarize({
        url: url,
        sentences_number: 6
    }, function(error, response) {
        if (error === null) {
            response.sentences.forEach(function(s) {
                sents.push({
                    sent: s
                })
            });
        }
        callback(JSON.stringify(sents));
    });
}

 // TAKES ARTICLE URL AND GETS METADATA
function getArticleData(url, callback) {
    var articledata = [];
    textapi.extract({
        url: url,
        best_image: true
    }, function(error, response) {
        if (error === null) {
            articledata.push({
                title: response.title,
                link: url,
                image: response.image
            })
        }
        callback(JSON.stringify(articledata));
    });
}

 // HELPER METHOD FOR FIXING A JSON PARSING ISSUE
function fixArticles(data, callback) {
    var newobj = [];
    for (var i = 0; i < data.length - 1; i++) {
        newobj += JSON.stringify(data[i]).concat(JSON.stringify(data[i + 1]));
    }
    callback(replaceAll(newobj, '][', ','));
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
