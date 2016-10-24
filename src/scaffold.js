/**
 * Created by dave on 10/21/16.
 */
var $rdf   = require('rdflib');
var fs     = require('fs');
var lodash = require('lodash');

var config = {
    vocab: 'https://yodata.io/reso/dd#'
};

var jsonScaffold = function jsonScaffold(kb, resourceName) {
    "use strict";
    var rdfs  = new $rdf.Namespace(kb.namespaces.rdfs);
    var reso  = new $rdf.Namespace(kb.namespaces.reso);
    var props = kb.match(null, rdfs('domain'), reso(resourceName));
    var res   = {};
    if (Array.isArray(props)) {
        props.forEach(function (statement) {
            var prop = statement.subject;
            var id   = prop.value;
            var ln   = id.substring(id.indexOf('#') + 1);
            var range;

            var ranges = kb.match(prop, rdfs('range'));
            if (ranges.length == 0) {
                return;
            }
            if (ranges.length == 1) {
                range = ranges[0]['object'];
            }
            if (ranges.length > 1) {
                // todo: handle multiple ranges
                range = lodash.first(ranges)['object'];
            }
            var propValue;
            switch (range.value) {
                case "http://www.w3.org/2001/XMLSchema#string":
                    propValue = ln;
                    break;
                default:
                    propValue = {
                        '@id':   ln,
                        '@type': range.value
                    }
            }

            res[ln] = propValue;
        });
    }
    return {'@context': res};
};

module.exports = {
    jsonScaffold
};
