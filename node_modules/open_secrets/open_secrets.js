#!/usr/bin/env node

"use strict";

var OpenSecretsClient = require("./index"),
    program = require("commander");

program
    .option("--cid [string]", "candidate identification")
    .option("--cmte [string]", "committee ID in CQ format")
    .option("--congno [integer]", "112 (uses 2012 data) or 113 (uses 2014 data)")
    .option("--cycle [integer]", "2012 or 2014")
    .option(
        "--id [string]", "2-character state code, 4-character district or specific CID")
    .option("--ind [string]", "3-character industry code")
    .option("--indus [string]", "3-character industry code")
    .option("--oid [string]", "CRP organization ID")
    .option("--org [string]", "name or partial name of organization")
    .option("--output [string]", "output format, either json, xml or doc")
    .option("--year [integer]", "2010 data provided")
    .option("--verbose [boolean]", "display verbose HTTP response")
    .usage("<api_key> <method> [options]")
    .version("0.0.1")
    .parse(process.argv);

// validation
if (typeof(program.args[0]) === "undefined") {
    console.error("Must provide an 'apiKey'");
    process.exit(1);
};

if (typeof(program.args[1]) === "undefined") {
    console.error("Must specify a 'method'");
    process.exit(1);
};

var apiKey = program.args[0],
    client = new OpenSecretsClient(apiKey),
    method = program.args[1],
    options = {};

switch (method) {
    case "candContrib":
    case "candIndustry":
    case "candSector":
    case "candSummary":
        options.cid = program.cid;
        options.cycle = program.cycle;
        options.output = program.output;
        break;
    case "candIndByInd":
        options.cid = program.cid;
        options.cycle = program.cycle;
        options.ind = program.ind;
        break;
    case "congCmteIndus":
        options.cmte = program.cmte;
        options.congno = program.congno;
        options.indus = program.indus;
        options.output = program.output;
        break;
    case "getLegislators":
        options.id = program.id;
        options.output = program.output;
        break;
    case "getOrgs":
        options.org = program.org;
        break;
    case "memPFDprofile":
        options.cid = program.cid;
        break;
    case "orgSummary":
        options.oid = program.oid;
        break;
    default:
        console.error("Unsupported method: " + method);
}

client[method](options, function(err, res) {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        if (program.verbose) {
            console.log(res);
        } else {
            console.log(res.body);
        }
        process.exit(0);
    }
});
