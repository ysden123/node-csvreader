// File reader
'use strict';
var readline = require('readline');
var csv = require('csv');

// fileName - specifies the input CSV file.
// recordHandler - callback(data), where data is array of record values.
function read(fileName, recordHandler, options) {

    let promise = new Promise((resolve, reject) => {

        let lineReader = readline.createInterface({
            input: require('fs').createReadStream(fileName)
        });

        let skip = 0;
        let lineCount = 0;

        if (options) {
            if (options.skip) {
                skip = options.skip;
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
                            if (data.length > 0) {
                                recordHandler(data[0]);
                            } else {
                                recordHandler(null);
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
