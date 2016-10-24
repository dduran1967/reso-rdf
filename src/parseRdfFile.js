var $rdf   = require('rdflib');
var fs     = require('fs');
var lodash = require('lodash');

var defaults = {
    baseUrl:     'https://yodata.io/reso/dd',
    contentType: 'text/turtle'
};

var parseRdfFile = function parseRdfFile(filePath, kb, options, callback) {
    "use strict";
    var opt  = lodash.defaults({}, options, defaults);
    var data = fs.readFileSync(filePath, 'utf-8');
    $rdf.parse(data, kb, opt.baseUrl, opt.contentType);
    if (typeof callback === 'function') {
        return callback(null, kb);
    }
    return kb;
};

module.exports = parseRdfFile;