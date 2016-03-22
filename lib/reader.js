// File reader
'use strict';
var readline = require('readline');
var csv = require('csv');

// fileName - specifies the input CSV file.
// recordHandler - callback(data), where data is array of record values.
function reader(fileName, recordHandler) {
    var lineReader = readline.createInterface({
        input: require('fs').createReadStream(fileName)
    });

    lineReader
        .on('line', (line) => {
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
        });
}

module.exports.reader = reader;
