"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xmlToJson = xmlToJson;

var _fs = require("fs");

var _xml2js = require("xml2js");

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function xmlToJson(pathToXmlSource, callback) {
    var parser = new _xml2js2.default.Parser();
    _fs.fs.readFile(pathToXmlSource, function (err, xmlString) {
        parser.parseString(xmlString, function (err, jsonData) {
            if (typeof callback === 'function') {
                return callback(err, jsonData);
            }
            console.dir(jsonData);
        });
    });
}

//# sourceMappingURL=xmlToJson-compiled.js.map