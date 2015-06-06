open_secrets
============

A NodeJS toolset for working with the OpenSecrets API.

Overview
--------

This project is largely based upon the work started with
https://github.com/ameensol/opensecrets. The NodeJS module contained herein
implements a different API than ameensol's module, thus simple pull-requests
were deemed inappropriate. Additionally, this module:

1. Includes a CLI client
2. Includes unit tests
3. Features an expanded list of methods that interact with the OpenSecrets API
4. Does not include any hard-coded API parameters

Setup
-----

You need an OpenSecrets API key to use this module; register for one here:
https://www.opensecrets.org/api/admin/index.php?function=signup

Module Usage
------------

Format:

    client.<method>(<config>, <callback>);

Example:

    var OpenSecretsClient = require("/index");

    var client = new OpenSecretsClient("<api_key>"),
        config = {
            cid: "N00008051",
            cycle: 2014,
            output: "json"
        },
        callback = function(err, response) {
            if (err) { throw err; }
            console.log(response);
        };

    client.candContrib(config, callback);

CLI Usage
---------

Format:

    $ ./open_secrets.js <api_key> <method> [params]

Example:

    $ ./open_secrets.js 0123456789 candContrib --cid=N00008051 --cycle=2014 --output=json

Examples
--------

To run the examples:

1. Create a config.json file in the module root:

    $ echo '{ "apiKey": "<api_key>" }' > config.json

2. Execute (WARNING: use judiciously because the examples submit live
   requests that count against your API quota):

    $ node examples.js

Testing
-------

The unit tests are written for Jasmine and can be executed with:

    $ npm test

Contributions
-------------

Contributions are absolutely welcome and should be accompanied by necessary and
passing tests.
