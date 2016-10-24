var fs        = require('fs');
var gulp      = require('gulp');
var parser    = require('./src/reso-parse-dd');
var $rdf      = require('rdflib');
var parseFile = require('./src/parseRdfFile');
var scaffold  = require('./src/scaffold');

var config = {
    xmlSrc:    './vendor/reso/reso_dd_1.5.xml',
    ttlSource: './vendor/reso/reso_ddwiki_v15.xml'
};

gulp.task('default', function () {
    gulp.src('./vendor/reso/*.xml', function (err, files) {
        "use strict";
        if (err) {
            return console.error(err);
        }
        files.forEach(function (path) {
            parser.parseResoWikiXML(path, function (err, response) {
                console.log(arguments);
            });
        });
    });
});

gulp.task('xml2json', function (cb) {
    "use strict";

});

gulp.task('scaffold', function () {
    "use strict";
    var kb = new $rdf.IndexedFormula();
    parseFile(config.ttlSource, kb);
    var resources = {};
    var member    = scaffold.jsonScaffold(kb, 'Member');
    fs.writeFileSync('./examples/member.json', JSON.stringify(member, null, ' '));

    var openHouse = scaffold.jsonScaffold(kb, 'OpenHouse');
    fs.writeFileSync('./examples/openHouse.json', JSON.stringify(openHouse, null, ' '));

    var office = scaffold.jsonScaffold(kb, 'Office');
    fs.writeFileSync('./examples/office.json', JSON.stringify(openHouse, null, ' '));

    var Property = scaffold.jsonScaffold(kb, 'Property');
    fs.writeFileSync('./examples/property.json', JSON.stringify(openHouse, null, ' '));
});
