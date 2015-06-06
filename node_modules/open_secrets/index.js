"use strict";

var querystring = require("querystring"),
    request = require("request");

var VALID_OUTPUTS = ["doc", "json", "xml"];

/**
 * OpenSecrets API client
 *
 * @constructor
 * @param {String} apiKey
 * @return {Null}
 */
var OpenSecrets = module.exports = function(apiKey) {
    if (!apiKey || typeof(apiKey) !== "string") {
        throw new Error("constructor(): first parameter must be a string.");
    }
    this.apiKey = apiKey;
};


/**
 * Prepares a request for the 'candContrib' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Number} config.cycle
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=candContrib|OpenSecrets}
 */
OpenSecrets.prototype.candContrib = function(config, callback) {
    var methodName = "candContrib";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(config.cycle, "config.cycle", "number", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'candIndByInd' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Number} config.cycle
 * @param {String} config.ind
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=candIndByInd|OpenSecrets}
 */
OpenSecrets.prototype.candIndByInd = function(config, callback) {
    var methodName = "candIndByInd";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(config.cycle, "config.cycle", "number", methodName);
    validateType(config.ind, "config.ind", "string", methodName);
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'candIndustry' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Number} config.cycle
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=candIndustry|OpenSecrets}
 */
OpenSecrets.prototype.candIndustry = function(config, callback) {
    var methodName = "candIndustry";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(config.cycle, "config.cycle", "number", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'candSector' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Number} config.cycle
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=candSector|OpenSecrets}
 */
OpenSecrets.prototype.candSector = function(config, callback) {
    var methodName = "candSector";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(config.cycle, "config.cycle", "number", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'candSummary' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Number} config.cycle
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=candSummary|OpenSecrets}
 */
OpenSecrets.prototype.candSummary = function(config, callback) {
    var methodName = "candSummary";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(config.cycle, "config.cycle", "number", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'congCmteIndus' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cmte
 * @param {Number} config.congno
 * @param {String} config.indus
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=congCmteIndus|OpenSecrets}
 */
OpenSecrets.prototype.congCmteIndus = function(config, callback) {
    var methodName = "congCmteIndus";

    validateType(config, "config", "object", methodName);
    validateType(config.cmte, "config.cmte", "string", methodName);
    validateType(config.congno, "config.congno", "number", methodName);
    validateType(config.indus, "config.indus", "string", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'getLegislators' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.id
 * @param {String} config.output
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=getLegislators|OpenSecrets}
 */
OpenSecrets.prototype.getLegislators = function(config, callback) {
    var methodName = "getLegislators";

    validateType(config, "config", "object", methodName);
    validateType(config.id, "config.id", "string", methodName);
    validateType(config.output, "config.output", "string", methodName);
    if (VALID_OUTPUTS.indexOf(config.output) === -1) {
        throw new Error(
            methodName + "(): invalid 'config.output' attribute '" + config.output +
            "'; please choose from 'doc', 'json' or 'xml'.");
    }
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'getOrgs' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.org
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=getOrgs|OpenSecrets}
 */
OpenSecrets.prototype.getOrgs = function(config, callback) {
    var methodName = "getOrgs";

    validateType(config, "config", "object", methodName);
    validateType(config.org, "config.org", "string", methodName);
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'memPFDprofile' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.cid
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=memPFDprofile|OpenSecrets}
 */
OpenSecrets.prototype.memPFDprofile = function(config, callback) {
    var methodName = "memPFDprofile";

    validateType(config, "config", "object", methodName);
    validateType(config.cid, "config.cid", "string", methodName);
    validateType(callback, "callback", "function", methodName);

    config.output = "xml";
    config.output = 2010;

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Prepares a request for the 'orgSummary' OpenSecrets API endpoint.
 *
 * @param {Object} config
 * @param {String} config.oid
 * @param {Function} callback
 * @return {Null}
 * @see {@link https://www.opensecrets.org/api/?output=doc&method=orgSummary|OpenSecrets}
 */
OpenSecrets.prototype.orgSummary = function(config, callback) {
    var methodName = "orgSummary";

    validateType(config, "config", "object", methodName);
    validateType(config.oid, "config.oid", "string", methodName);
    validateType(callback, "callback", "function", methodName);

    return this._makeRequest({
        method: methodName,
        params: config,
    }, callback);
};


/**
 * Sends a HTTP GET request to the OpenSecrets API.
 *
 * @param {Object} config
 * @param {Function} callback
 * @return {Null}
 */
OpenSecrets.prototype._makeRequest = function(config, callback) {
    var cfg = {
        url: "http://www.opensecrets.org/api/?method=" + config.method + "&apikey=" +
            this.apiKey + "&" + querystring.stringify(config.params)
    };

    request.get(cfg, function(err, res, body) {
        if (res && res.statusCode === 200) {
            callback(null, res);
        } else {
            callback(new Error("makeRequest(): " + res.statusCode + " error."));
        }
    });
};


/**
 * Validates that a variable is defined and is of the expected type.
 *
 * @param {*} value
 * @param {String} valueName
 * @param {String} type
 * @param {String} method
 * @return null
 */
function validateType(value, valueName, type, method) {
    if (typeof(value) === "undefined" || typeof(value) !== type) {
        var indefiniteArticle = "a";

        if (type === "object") {
            indefiniteArticle = "an";
        }

        throw new Error(
            method + "(): '" + valueName + "' must be " + indefiniteArticle + " " +
            type + ".");
    }
}
