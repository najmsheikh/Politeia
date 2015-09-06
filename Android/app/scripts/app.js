/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
    // 'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    app.selected = 0;
    app.route = 'discover';
    app.headerTitle = 'Politeia';
    app.userLoggedIn = true;

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
    });

    window.addEventListener('paper-header-transform', function(e) {
        // console.dir(e);
    });

    // See https://github.com/Polymer/polymer/issues/1381
    // window.addEventListener('WebComponentsReady', function() {
    //     // imports are loaded and elements have been registered
    //     console.log('Web components loaded!');
    //     var loadEl = document.getElementById('splash');
    //     loadEl.addEventListener('transitionend', loadEl.remove);

    //     document.body.classList.remove('loading');
    // });

    window.addEventListener('changeExplorePage', function(data) {
        // console.log('Page will be changed! With name of: ' + data.detail);
        // console.log(data.detail.bio.candidate.preferredName)
        document.getElementById('candidate-pages').selected = 0;
        document.getElementById('explore-pages').selected = document.getElementById('explore-pages').selected == 1 ? 0 : 1;
        document.getElementById('mainToolbar').style.display = 'none';
        document.getElementById('candToolbar').style.display = 'block';
        app.candselected = 0;
        // document.getElementById('explore-pages').selected  = 2;
    });

    window.addEventListener('sortTopic', function(data) {
        var topic = data.detail.substring(0, data.detail.indexOf('.'));
        var active = data.detail.substring(data.detail.indexOf('.')+1);
        if (active == 'true') {
            if (!document.querySelector('my-discover').isPhone)
                topic = topic + 't';
            document.getElementById(topic).style.display = 'block';
        } else {
            if (!document.querySelector('my-discover').isPhone)
                topic = topic + 't';
            document.getElementById(topic).style.display = 'none';
        }
    })

})(document);
