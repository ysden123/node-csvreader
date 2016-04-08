// File reader
'use strict';
var readline = require('readline');
var csv = require('csv');

// fileName - specifies the input CSV file.
// recordHandler - callback(data), where data is array of record values.
/**
 * Reads a file line by line, calls CSV parser and the call recordHandler
 * 
 * @param {string} fileName specifies the input CSV-formatted file
 * @param {Function} recordHandler the callback(data), where data is array 
 * of record values.
 * @param {Object} options optional paramater may have following optionals properties:
 * skip - number, specifies number of lines to skip
 * headerRecordHandler - function, specifies callback(data) for 1st line
 * hasHeaders - bollean, specifies whether 1st line is the header line
 * parseOptions - object, specifies options for parser, see {@link http://csv.adaltas.com/parse/} 
 */
function read(fileName, recordHandler, options) {

    let promise = new Promise((resolve, reject) => {

        function processRecord(data, recordHandler) {
            if (data.length > 0) {
                recordHandler(data[0]);
            } else {
                recordHandler(null);
            }
        }

        function processHeaderRecord(data, headerRecordHandler) {
            if (data.length > 0) {
                headerRecordHandler(data[0]);
            } else {
                headerRecordHandler(null);
            }
        }

        let lineReader = readline.createInterface({
            input: require('fs').createReadStream(fileName)
        });

        let recordCount = 0;
        let skip = 0;
        let lineCount = 0;
        let headerRecordHandler;
        let hasHeaders = false;
        let parseOptions;

        if (options) {
            if (options.skip) {
                skip = options.skip;
            }
            if (options.headerRecordHandler) {
                headerRecordHandler = options.headerRecordHandler;
            }
            if (options.hasHeaders) {
                hasHeaders = options.hasHeaders;
            }
            if (options.parseOptions){
                parseOptions = options.parseOptions;
            }
        }

        lineReader
            .on('line', (line) => {
                if (++lineCount > skip) {
                    csv.parse(line, parseOptions, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        } else {
                            if (++recordCount == 1) {
                                if (hasHeaders) {
                                    if (headerRecordHandler != undefined) {
                                        processHeaderRecord(data, headerRecordHandler);
                                    }
                                } else {
                                    processRecord(data, recordHandler);
                                }
                            } else {
                                processRecord(data, recordHandler);
                            }
                        }
                    });
                }
            })
            .on('close', () => {
                resolve();
            });

    });

    return promise;
}

module.exports.read = read;
