// File reader
'use strict';
var readline = require('readline');
var csv = require('csv');

// fileName - specifies the input CSV file.
// recordHandler - callback(data), where data is array of record values.
function read(fileName, recordHandler, options) {
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
                    if (err)
                        console.err(err);
                    else {
                        if (data.length > 0) {
                            recordHandler(data[0]);
                        } else {
                            recordHandler(null);
                        }
                    }
                });
            }
        });
}

module.exports.read = read;
