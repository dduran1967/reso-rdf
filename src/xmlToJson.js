import {fs} from "fs";
import xml2js from "xml2js";

export function xmlToJson(pathToXmlSource, callback) {
    var parser = new xml2js.Parser();
    fs.readFile(pathToXmlSource, function (err, xmlString) {
        parser.parseString(xmlString, function (err, jsonData) {
            if (typeof callback === 'function') {
                return callback(err, jsonData);
            }
            console.dir(jsonData);
        });
    });
}