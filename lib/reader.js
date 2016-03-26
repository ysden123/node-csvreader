// File reader
'use strict';
var readline = require('readline');
var csv = require('csv');

// fileName - specifies the input CSV file.
// recordHandler - callback(data), where data is array of record values.
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
        }

        lineReader
            .on('line', (line) => {
                if (++lineCount > skip) {
                    csv.parse(line, (err, data) => {
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
