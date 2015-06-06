var OpenSecretsClient = require("../index"),
    request = require("request");

var API_KEY = "0123456789",
    JSON_STRING = "json",
    STRING = "test",
    NUMBER = 11;

describe("constructor", function() {
    it("requires the 'apiKey' parameter", function() {
        expect(function() {
            new OpenSecretsClient();
        }).toThrow(new Error("constructor(): first parameter must be a string."));
    });

    it("expects the 'apiKey' parameter to be a string", function() {
        expect(function() {
            new OpenSecretsClient(0);
        }).toThrow(new Error("constructor(): first parameter must be a string."));
    });

    it("stores the 'apiKey' parameter as an attribute", function() {
        var client = new OpenSecretsClient(API_KEY);
        expect(client.apiKey).toEqual(API_KEY);
    });

    it("is not null", function() {
        var client = new OpenSecretsClient(API_KEY);
        expect(client).not.toBe(null);
    });
});

describe("candContrib", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "candContrib";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'config.cycle' attribute to be a number", function() {
        var cfg = { cid: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cycle' must be a number."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = { cid: STRING, cycle: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: JSON_STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { cid: STRING, cycle: NUMBER, output: JSON_STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("candIndByInd", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "candIndByInd";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'config.cycle' attribute to be a number", function() {
        var cfg = { cid: STRING, cylce: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cycle' must be a number."));
    });

    it("requires the 'config.ind' attribute to be a string", function() {
        var cfg = { cid: STRING, cycle: NUMBER, ind: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.ind' must be a string."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING, cycle: NUMBER, ind: STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var client = new OpenSecretsClient(API_KEY),
            cfg = {
                method: methodName,
                params: { cid: STRING, cycle: NUMBER, ind: STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("candIndustry", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "candIndustry";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'config.cycle' attribute to be a number", function() {
        var cfg = { cid: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cycle' must be a number."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = { cid: STRING, cycle: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: JSON_STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { cid: STRING, cycle: NUMBER, output: JSON_STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("candSector", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "candSector";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'config.cycle' attribute to be a number", function() {
        var cfg = { cid: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cycle' must be a number."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = { cid: STRING, cycle: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: JSON_STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { cid: STRING, cycle: NUMBER, output: JSON_STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("candSummary", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "candSummary";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'config.cycle' attribute to be a number", function() {
        var cfg = { cid: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cycle' must be a number."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = { cid: STRING, cycle: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING, cycle: NUMBER, output: JSON_STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { cid: STRING, cycle: NUMBER, output: JSON_STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("congCmteIndus", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "congCmteIndus";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cmte' attribute to be a string", function() {
        var cfg = { cmte: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cmte' must be a string."));
    });

    it("requires the 'config.congno' attribute to be a number", function() {
        var cfg = { cmte: STRING, congno: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.congno' must be a number."));
    });

    it("requires the 'config.indus' attribute to be a number", function() {
        var cfg = {
                cmte: STRING,
                congno: NUMBER,
                indus: NUMBER
            },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.indus' must be a string."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = {
                cmte: STRING,
                congno: NUMBER,
                indus: STRING,
                output: NUMBER
            },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = {
                cmte: STRING,
                congno: NUMBER,
                indus: STRING,
                output: STRING
            },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = {
                cmte: STRING,
                congno: NUMBER,
                indus: STRING,
                output: JSON_STRING
            },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: {
                    cmte: STRING,
                    congno: NUMBER,
                    indus: STRING,
                    output: JSON_STRING
                }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("getLegislators", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "getLegislators";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.id' attribute to be a string", function() {
        var cfg = { id: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.id' must be a string."));
    });

    it("requires the 'config.output' attribute to be a string", function() {
        var cfg = { id: STRING, output: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.output' must be a string."));
    });

    it("requires the 'config.output' attribute to be valid", function() {
        var cfg = { id: STRING, output: STRING },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): invalid 'config.output' attribute '" + STRING +
            "'; please choose from 'doc', 'json' or 'xml'."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { id: STRING, output: JSON_STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { id: STRING, output: JSON_STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("getOrgs", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "getOrgs";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.org' attribute to be a string", function() {
        var cfg = { org: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.org' must be a string."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { org: STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { org: STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("memPFDprofile", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "memPFDprofile";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.cid' attribute to be a string", function() {
        var cfg = { cid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.cid' must be a string."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { cid: STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { cid: STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("orgSummary", function() {
    var client = new OpenSecretsClient(API_KEY),
        methodName = "orgSummary";

    it("requires the 'config' parameter to be an object", function() {
        var cfg = STRING,
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config' must be an object."));
    });

    it("requires the 'config.oid' attribute to be a string", function() {
        var cfg = { oid: NUMBER },
            callback = function() {};

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'config.oid' must be a string."));
    });

    it("requires the 'callback' parameter to be a function", function() {
        var cfg = { oid: STRING },
            callback = STRING;

        expect(function() {
            client[methodName](cfg, callback);
        }).toThrow(new Error(
            methodName + "(): 'callback' must be a function."));
    });

    it("calls '_makeRequest'", function() {
        var cfg = {
                method: methodName,
                params: { oid: STRING }
            },
            callback = function() {};

        spyOn(client, "_makeRequest");
        client[methodName](cfg.params, callback);
        expect(client._makeRequest).toHaveBeenCalledWith(cfg, callback);
    });
});

describe("_makeRequest", function() {
    it("calls 'request'", function() {
        var client = new OpenSecretsClient(API_KEY);

        spyOn(request, "get");
        client.candContrib(
            { cid: STRING, cycle: NUMBER, output: "json" }, function() {});
        expect(request.get).toHaveBeenCalled();
    });
});
